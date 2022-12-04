/** @format */

import React from "react";
import { Box, Spinner, useToast } from "@chakra-ui/react";
import InputComp from "../../components/InputComp/InputComp";
import ButtonComp from "../../components/ButtonComp/ButtonComp";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const toast = useToast();
  const history = useHistory();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cPassword, setCPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);

  React.useEffect(() => {
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !cPassword.trim()
    ) {
      setIsDisable(true);
    } else {
      if (cPassword === password) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    }
  }, [username, email, password, cPassword]);

  // *** Register new user API
  const registerUser = () => {
    setIsLoading(true);
    var data = JSON.stringify({
      username: username,
      email: email,
      password: password,
    });

    var config = {
      method: "post",
      url: "http://localhost:6050/api/user/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        toast({
          title: "Account created.",
          description: `${response.data.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        history.push("/");
        setIsDisable(true);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        toast({
          title: "Account created.",
          description: `${error.response.data.msg}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Box className='auth_container'>
      <Box className='auth_form_container'>
        <span className='auth_header'>SignUp</span>
        <Box className='auth_form'>
          {/* Username */}
          <InputComp
            type='text'
            placeholder='Enter username'
            className='input_text_form'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* Email */}
          <InputComp
            type='email'
            placeholder='Enter email'
            className='input_text_form'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          {/* Password */}
          <InputComp
            type='password'
            placeholder='Enter password'
            className='input_text_form'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Confirm password */}
          <InputComp
            type='password'
            placeholder='Confirm password'
            className='input_text_form'
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
        </Box>
        <Box className='loginLink'>
          <Link to='/'>Already have an account?</Link>
        </Box>
        <ButtonComp
          className='auth_btn'
          btnText={isLoading ? <Spinner /> : <>SignUp</>}
          disable={isDisable}
          clickHandler={registerUser}
        />
      </Box>
    </Box>
  );
};

export default Register;
