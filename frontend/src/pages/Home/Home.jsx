/** @format */

import React from "react";
import MainLayout from "../../Layout/MainLayout";
import { GlobalContext } from "../../context/Context";
import { Box, Button, Spinner } from "@chakra-ui/react";
import { MdCreateNewFolder } from "react-icons/md";
import ModalComp from "../../components/Modalcomp/ModalComp";
import InputComp from "../../components/InputComp/InputComp";
import TextAreaComp from "../../components/TextareaComp/TextAreaComp";
import ButtonComp from "../../components/ButtonComp/ButtonComp";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import TaskCard from "../../components/TaskCard/TaskCard";

const Home = () => {
  const toast = useToast();
  const { tasks, setTasks, updatedTask } = GlobalContext();
  const [selectTab, setSelectTab] = React.useState("all");
  const [isOpenTaskModal, setIsOpenTaskModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);
  // const [tasks, setTasks] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);

  // *** Close task modal
  const closeModal = () => {
    setIsOpenTaskModal(false);
    setTitle("");
    setBody("");
  };

  // *** Handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value.slice(0, 50));
  };
  // *** Handle body change
  const handleBodyChange = (e) => {
    setBody(e.target.value.slice(0, 300));
  };

  React.useEffect(() => {
    if (!title.trim() || !body.trim()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [title, body]);

  // *** Create task
  const createTask = () => {
    setIsLoading(true);
    var data = JSON.stringify({
      title: title,
      body: body,
    });

    var config = {
      method: "post",
      url: "http://localhost:6050/api/task/create",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data.task);
        setTasks((prev) => [response.data.task, ...prev]);
        setIsLoading(false);
        toast({
          title: "Task created.",
          description: `${response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        closeModal();
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        toast({
          title: "Error!",
          description: `${error.response.data.msg}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  // *** fetch all tasks
  const fetchTasks = () => {
    var config = {
      method: "get",
      url: `http://localhost:6050/api/task/fetch?page=${page}&limit=${limit}&status=${selectTab}`,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);
        setTasks(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(() => {
    fetchTasks();
  }, [page, limit, selectTab, updatedTask]);

  return (
    <MainLayout>
      {isOpenTaskModal && (
        <ModalComp
          isOpen={isOpenTaskModal}
          onClose={closeModal}
          title='Create task'
          body={
            <div className='modal_body'>
              <InputComp
                type='text'
                placeholder='Title of your task'
                className='task_form_input'
                value={title}
                onChange={(e) => handleTitleChange(e)}
              />
              <TextAreaComp
                type='text'
                placeholder='Enter some details of your task'
                className='textarea_form_input'
                value={body}
                onChange={(e) => handleBodyChange(e)}
              />
            </div>
          }
          footer={
            <ButtonComp
              btnText={isLoading ? <Spinner /> : <>Create</>}
              className='modal_footer_btn'
              disable={isDisable}
              clickHandler={createTask}
            />
          }
        />
      )}
      <Box className='home_container'>
        <Button
          className='create_action_button'
          onClick={() => setIsOpenTaskModal(true)}>
          <MdCreateNewFolder />
        </Button>

        {/* Tabs */}
        <Box className='tab'>
          <Button
            className={
              selectTab === "all"
                ? "tab_button all_task_tab"
                : "tab_button active_all_tab"
            }
            onClick={() => setSelectTab("all")}>
            All Tasks
          </Button>

          <Button
            className={
              selectTab === "remain"
                ? "tab_button remain_task_tab"
                : "tab_button active_remain_tab"
            }
            onClick={() => setSelectTab("remain")}>
            Remaining Tasks
          </Button>

          <Button
            className={
              selectTab === "complete"
                ? "tab_button complete_task_tab"
                : "tab_button active_complete_tab"
            }
            onClick={() => setSelectTab("complete")}>
            Completed Tasks
          </Button>
        </Box>

        {/* Rendering tasks  */}
        <Box className='task_container'>
          {(tasks || []).length > 0 ? (
            <Box>
              {tasks.map((task) => (
                <TaskCard key={task._id} taskData={task} />
              ))}
            </Box>
          ) : (
            <Box className='empty_task_container'>No task avalible</Box>
          )}
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Home;
