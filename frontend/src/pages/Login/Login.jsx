/** @format */

import React from "react";
import { Box, Spinner, useToast } from "@chakra-ui/react";
import InputComp from "../../components/InputComp/InputComp";
import ButtonComp from "../../components/ButtonComp/ButtonComp";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const history = useHistory();
  const [logUser, setLogUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);

  React.useEffect(() => {
    if (!logUser.trim() || !password.trim()) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [logUser, password]);

  const logInUser = () => {
    setIsLoading(true);
    var data = JSON.stringify({
      logUser: logUser,
      password: password,
    });

    var config = {
      method: "post",
      url: "http://localhost:6050/api/user/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        history.push("/home");
        setIsDisable(true);
        setIsLoading(false);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box className='auth_container'>
      <Box className='auth_form_container'>
        <span className='auth_header'>SignIn</span>
        <Box className='auth_form'>
          <InputComp
            type='text'
            placeholder='Enter username'
            className='input_text_form'
            value={logUser}
            onChange={(e) => setLogUser(e.target.value)}
          />
          {/* Password */}
          <InputComp
            type='password'
            placeholder='Enter password'
            className='input_text_form'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box className='loginLink'>
            <Link to='/register'>Don't have an account?</Link>
          </Box>
          <ButtonComp
            className='auth_btn'
            btnText={isLoading ? <Spinner /> : <>SignUp</>}
            disable={isDisable}
            clickHandler={logInUser}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
