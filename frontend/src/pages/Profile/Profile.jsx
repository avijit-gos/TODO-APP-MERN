/** @format */

import { Avatar, Box, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React from "react";
import MainLayout from "../../Layout/MainLayout";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import InputComp from "../../components/InputComp/InputComp";
import ButtonComp from "../../components/ButtonComp/ButtonComp";
import { GlobalContext } from "../../context/Context";
import { AiOutlineEdit } from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";
const Profile = () => {
  const { id } = useParams();
  const { token, setToken } = GlobalContext();
  const toast = useToast();
  const history = useHistory();
  const [profile, setProfile] = React.useState(null);
  const [prevImage, setPrevImage] = React.useState("");
  const [image, setImage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // *** Fetch profile
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

  return (
    <MainLayout>
      {profile ? (
        <Box className='main_children'>
          <Box className='profile_box1'>
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
              <ButtonComp
                clickHandler={uploadImage}
                className='profile_upload_btn'
                btnText='Upload'
              />
            )}
          </Box>

          {!prevImage && (
            <Box className='profile_box2'>
              {!profile.name ? (
                <Box>
                  Please! set Your profile name
                  <Button
                    className='profile_edit_btn'
                    onClick={() => history.push("/settings")}>
                    <AiOutlineEdit />
                  </Button>
                </Box>
              ) : (
                <span className='profile_name'>{profile.name}</span>
              )}
            </Box>
          )}
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
    </MainLayout>
  );
};

export default Profile;
