/** @format */

import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { NavLink, useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const SideNavbar = ({ user }) => {
  const history = useHistory();
  var profile = "/profile/" + user._id;
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push("/");
  };
  return (
    <Box className='sidenav_section'>
      <nav className='nav'>
        {/* Home */}
        <Box className='nav_link'>
          <NavLink to='/home' className='nav_item'>
            <AiFillHome />
          </NavLink>
        </Box>

        {/* Profile */}
        <Box className='nav_link'>
          <NavLink to={profile} className='nav_item'>
            <FaUser />
          </NavLink>
        </Box>

        {/* Settings */}
        <Box className='nav_link'>
          <NavLink to='/settings' className='nav_item'>
            <AiFillSetting />
          </NavLink>
        </Box>

        {/* Logout */}
        <Box className='nav_link'>
          <Button className='nav_item' onClick={logout}>
            <FiLogOut />
          </Button>
        </Box>
      </nav>
    </Box>
  );
};

export default SideNavbar;
