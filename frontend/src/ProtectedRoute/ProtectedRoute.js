/** @format */

import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => {
  console.log(isAuth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          return <Component />;
        } else {
          return <Redirect to='/' />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
