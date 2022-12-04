/** @format */

import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import FooterNavbar from "../components/FooterNavbar/FooterNavbar";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import { GlobalContext } from "../context/Context";

const MainLayout = ({ children }) => {
  const { user, token } = GlobalContext();
  return (
    <React.Fragment>
      {user && token && (
        <Box
          className={
            localStorage.getItem("mode") === "day"
              ? "app_layout_container"
              : "app_layout_container night_mode"
          }>
          <Navbar />
          <Box className='main_app_container'>
            {/* Navbar section */}
            <SideNavbar user={user} />
            {/* Children */}
            <Box className='main_children'>{children}</Box>
          </Box>
          {/* Footer */}
          <FooterNavbar user={user} />
        </Box>
      )}
    </React.Fragment>
  );
};

export default MainLayout;
