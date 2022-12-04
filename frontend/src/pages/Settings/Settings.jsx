/** @format */

import React from "react";
import MainLayout from "../../Layout/MainLayout";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Avatar,
  Spinner,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { GlobalContext } from "../../context/Context";
import { useHistory, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import InputComp from "../../components/InputComp/InputComp";
import ButtonComp from "../../components/ButtonComp/ButtonComp";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";

const Settings = () => {
  const { id } = useParams();
  const { token, setToken, user } = GlobalContext();
  const toast = useToast();
  const history = useHistory();
  const [profile, setProfile] = React.useState(null);
  const [prevImage, setPrevImage] = React.useState("");
  const [image, setImage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [isDisable, setIsDisble] = React.useState(true);
  const [mode, setMode] = React.useState("day");

  React.useEffect(() => {
    var config = {
      method: "get",
      url: "http://localhost:6050/api/user/fetch/profile",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        setProfile(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id, token]);

  // *** Handle profile image input
  const handleFileChange = (e) => {
    setPrevImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  // *** Handle upload profile image
  const uploadImage = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));

    var formdata = new FormData();
    formdata.append("image", image);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:6050/api/user/upload/profile/image", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        localStorage.getItem(result.token);
        setToken(result.token);
        toast({
          title: "Success",
          description: `Profile image uploaded`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
        setPrevImage("");
        setImage("");
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: `Could not upload image`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
        setPrevImage("");
        setImage("");
      });
  };

  React.useEffect(() => {
    if (!name.trim() || !username.trim()) {
      setIsDisble(true);
    } else {
      setIsDisble(false);
    }
  }, [name, username]);

  // *** Update profile info
  const handleUpdateProfile = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      username: username,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:6050/api/user/edit/profile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        history.push("/");
      })
      .catch((error) => console.log("error", error));
  };

  const handleModeChange = (e) => {
    localStorage.setItem("mode", e.target.value);
    window.location.reload(false);
  };

  return (
    <MainLayout>
      {profile && (
        <Box className='main_children settings_section'>
          {/* Personal settings */}
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    Personal Settings
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {/* Profile image section */}
                <Box className='profile_avatar_section'>
                  <Avatar
                    src={prevImage ? prevImage : profile.profilePic}
                    className='profile_avatar'
                  />
                  <label htmlFor='file' className='file_icon'>
                    <AiOutlineCamera />{" "}
                  </label>
                  <InputComp
                    type='file'
                    id='file'
                    className='file_input'
                    onChange={(e) => handleFileChange(e)}
                  />
                </Box>

                {prevImage && (
                  <Box className='button_container'>
                    <ButtonComp
                      btnText={isLoading ? <Spinner /> : <>Upload</>}
                      className='image_upload_btn'
                      clickHandler={uploadImage}
                    />
                  </Box>
                )}

                {/* Profile name and username section */}
                <Box className='setting_box2'>
                  <InputComp
                    type='text'
                    placeholder='Enter name'
                    className='input_text_form'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <InputComp
                    type='text'
                    placeholder='Enter username'
                    className='input_text_form'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <ButtonComp
                    btnText={isLoading ? <Spinner /> : <>Update</>}
                    className='image_upload_btn'
                    disable={isDisable}
                    clickHandler={handleUpdateProfile}
                  />
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          {/* Other settings */}
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    Other Settings
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                onChange={(e) => handleModeChange(e)}
                value={mode}>
                <Box className='other_settings_container'>
                  <RadioGroup defaultValue='1'>
                    <Stack direction='row'>
                      <Radio
                        value='night'
                        checked={localStorage.getItem("mode") === "night"}>
                        Night
                      </Radio>
                      <Radio
                        value='day'
                        checked={localStorage.getItem("mode") === "day"}>
                        Day
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      )}
    </MainLayout>
  );
};

export default Settings;
