/** @format */
import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import { GlobalContext } from "./context/Context";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function App() {
  const { setUser, setToken } = GlobalContext();
  const [isAuth, setIsAuth] = React.useState(false);

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <div className='App'>
      <Switch>
        <Route path={"/"} exact component={() => <Login />} />
        <Route path={"/register"} exact component={() => <Register />} />

        {/* Protected routes */}
        <ProtectedRoute
          path={"/home"}
          exact
          component={Home}
          isAuth={localStorage.getItem("token") ? true : false}
        />
        <ProtectedRoute
          path={"/profile/:id"}
          exact
          component={Profile}
          isAuth={localStorage.getItem("token") ? true : false}
        />
        <ProtectedRoute
          path={"/settings"}
          exact
          component={Settings}
          isAuth={localStorage.getItem("token") ? true : false}
        />
      </Switch>
    </div>
  );
}

export default App;
