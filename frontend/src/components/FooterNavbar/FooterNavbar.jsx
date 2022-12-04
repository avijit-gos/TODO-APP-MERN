/** @format */

import { Box, Button, Spinner } from "@chakra-ui/react";
import React from "react";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdCreateNewFolder } from "react-icons/md";
import ModalComp from "../Modalcomp/ModalComp";
import InputComp from "../InputComp/InputComp";
import TextAreaComp from "../TextareaComp/TextAreaComp";
import ButtonComp from "../ButtonComp/ButtonComp";
import { useToast } from "@chakra-ui/react";
import { GlobalContext } from "../../context/Context";
import axios from "axios";

const FooterNavbar = () => {
  const { user, token, tasks, setTasks } = GlobalContext();
  const toast = useToast();
  const history = useHistory();
  const [isOpenTaskModal, setIsOpenTaskModal] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);

  var profile = "/profile/" + user._id;

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
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);
        setTasks((prev) => [response.data.task, ...prev]);
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
        toast({
          title: "Error!",
          description: `${error.response.data.msg}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <Box className='foot_navbar'>
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
      <nav className='nav_footer'>
        {/* Home */}
        <Box className='footer_nav_link'>
          <Link to='/home' className='footer_nav_item'>
            <AiFillHome />
          </Link>
        </Box>

        {/* Profile */}
        <Box className='footer_nav_link'>
          <Link to={profile} className='footer_nav_item'>
            <FaUser />
          </Link>
        </Box>

        {/* Create Post */}
        <Box className='footer_nav_link'>
          <Button
            className='footer_nav_item'
            onClick={() => setIsOpenTaskModal(true)}>
            <MdCreateNewFolder />
          </Button>
        </Box>

        {/* Settings */}
        <Box className='footer_nav_link'>
          <Link to='/settings' className='footer_nav_item'>
            <AiFillSetting />
          </Link>
        </Box>

        {/* Logout */}
        <Box className='footer_nav_link'>
          <Button className='footer_nav_item' onClick={logout}>
            <FiLogOut />
          </Button>
        </Box>
      </nav>
    </Box>
  );
};

export default FooterNavbar;
