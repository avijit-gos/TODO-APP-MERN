/** @format */

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { GrMore } from "react-icons/gr";
import { GlobalContext } from "../../context/Context";
import ModalComp from "../Modalcomp/ModalComp";
import { useToast } from "@chakra-ui/react";
import { BsPin } from "react-icons/bs";
import axios from "axios";

const TaskCard = ({ taskData }) => {
  const toast = useToast();
  const { setUpdatedTask } = GlobalContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [openPinModal, setOpenPinModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openDoneModal, setOpenDoneModal] = React.useState(false);
  const [taskId, setTaskId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  const handlePinModal = (id) => {
    setTaskId(id);
    setOpenPinModal(true);
  };
  // ***  close pin modal
  const closePinModal = () => {
    setOpenPinModal(false);
    setOpenDoneModal(false);
    setOpenDeleteModal(false);
    setTaskId("");
  };

  // *** handle pin task
  const handlePinTask = () => {
    var config = {
      method: "put",
      url: "http://localhost:6050/api/task/pinn/" + taskId,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setUpdatedTask((p) => !p);
        toast({
          title: "Success",
          description: `${response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setOpenPinModal(false);
      })
      .catch(function (error) {
        console.log(error);
        toast({
          title: "Error",
          description: `${error.response.data.msg}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleDoneModal = (id) => {
    setOpenDoneModal(true);
    setTaskId(id);
  };

  // *** handle complete task
  const handleCompleteTask = () => {
    setIsLoading(true);
    var config = {
      method: "put",
      url: "http://localhost:6050/api/task/status/" + taskId,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setUpdatedTask((p) => !p);
        setIsLoading(false);
        closePinModal();
        toast({
          title: "Success",
          description: `${response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setOpenDoneModal(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        closePinModal();
        toast({
          title: "Success",
          description: `${error.response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setTaskId(id);
  };

  // *** Handle delete task
  const handleDeleteTask = () => {
    setIsLoading(true);
    var config = {
      method: "delete",
      url: "http://localhost:6050/api/task/delete/" + taskId,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        setUpdatedTask((p) => !p);
        setIsLoading(false);
        closePinModal();
        toast({
          title: "Success",
          description: `${response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setOpenDeleteModal(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        closePinModal();
        toast({
          title: "Success",
          description: `${error.response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Box className={taskData.status ? "task_card complate_task" : "task_card"}>
      {
        <ModalComp
          isOpen={openPinModal}
          onClose={closePinModal}
          title={taskData.pin ? <>Unpin task</> : <>Pin task</>}
          body={
            <div>
              {taskData.pin ? (
                <>Do you want to unpin this task?</>
              ) : (
                <>Do you want to pin this task?</>
              )}
            </div>
          }
          footer={
            <div>
              {
                <Button className='modal_footer_btn' onClick={handlePinTask}>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>{taskData.pin ? <>Unpin</> : <>Pin</>}</>
                  )}
                </Button>
              }
            </div>
          }
        />
      }

      {/* Task complete modal */}
      {
        <ModalComp
          isOpen={openDoneModal}
          onClose={closePinModal}
          title={"Delete task"}
          body={<div>Is this task has been completed?</div>}
          footer={
            <div>
              {
                <Button
                  className='modal_footer_btn'
                  onClick={handleCompleteTask}>
                  {isLoading ? <Spinner /> : <>Done</>}
                </Button>
              }
            </div>
          }
        />
      }

      {/* Task delete modal */}
      {
        <ModalComp
          isOpen={openDeleteModal}
          onClose={closePinModal}
          title={"Complete task"}
          body={<div>Do yo want to delete this task?</div>}
          footer={
            <div>
              {
                <Button className='modal_footer_btn' onClick={handleDeleteTask}>
                  {isLoading ? <Spinner /> : <>Delete</>}
                </Button>
              }
            </div>
          }
        />
      }

      {taskData.pin && (
        <Box className='pin_container'>
          <BsPin />
        </Box>
      )}
      {/* Header */}
      <Box className='task_card_header'>
        <span className='title'>{taskData.title}</span>
        <Menu>
          <MenuButton as={Button} className='menu_btn'>
            <GrMore />
          </MenuButton>
          <MenuList>
            <MenuItem
              className='menu_item'
              onClick={() => handlePinModal(taskData._id)}>
              {taskData.pin ? <>Unpinn</> : <>Pin</>}
            </MenuItem>
            <MenuItem
              className='menu_item'
              onClick={() => setOpenEditModal(true)}>
              Edit
            </MenuItem>
            {!taskData.status && (
              <MenuItem
                className='menu_item'
                onClick={() => handleDoneModal(taskData._id)}>
                Done
              </MenuItem>
            )}
            <MenuItem
              className='menu_item delete'
              onClick={() => handleDeleteModal(taskData._id)}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      {/* Body */}
      <Box className='task_card_body'>{taskData.body}</Box>
    </Box>
  );
};

export default TaskCard;
