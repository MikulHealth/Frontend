import { List, ListIcon, ListItem } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import LogoutModal from "../sections/LogoutModal";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineWallet,
  AiOutlineTool,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import logo from "../../assets/LogoColoured.svg";
import {
  Avatar,
  HStack,
  Heading,
  Spacer,
  Box,
  Text,
  Flex,
  extendTheme,
  Image,
} from "@chakra-ui/react";

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem("token");
    localStorage.removeItem("phoneNumber");
    navigate("/");
  };
  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <Flex width="25%" as="sidebar" p="10px" h="100vh">
      <List
        marginLeft="-10px"
        marginTop="10px"
        fontSize="24px"
        spacing={10}
        paddingLeft={0}
      >
        <ListItem marginLeft="50px" w="100%">
          <Image
            src={logo}
            alt="Logo"
            w="250px"
            h="70px"
            marginBottom="50px"
            onClick={reloadPage}
            style={{
              cursor: "pointer",
            }}
            _hover={{ color: "" }}
          />
        </ListItem>

        <ListItem
          marginLeft="-5px"
          color={location.pathname === "/dashboard" ? "#A210C6" : ""}
          textDecoration={location.pathname === "/dashboard" ? "underline" : ""}
       
        >
          <NavLink to="/dashboard">
            <ListIcon as={AiOutlineHome} />
            Home
          </NavLink>
        </ListItem>

        <ListItem
          marginLeft="76px"
          color={location.pathname === "/appointment" ? "#A210C6" : ""}
          textDecoration={
            location.pathname === "/appointment" ? "underline" : ""
          }
       
        >
          <NavLink to="/appointment">
            <ListIcon as={AiOutlineCalendar} />
            Appointments
          </NavLink>
        </ListItem>

        <ListItem
          marginLeft="-5px"
          color={location.pathname === "/wallet" ? "#A210C6" : ""}
          textDecoration={location.pathname === "/wallet" ? "underline" : ""}
        
        >
          {/* <NavLink to="/wallet"> */}
            <ListIcon as={AiOutlineWallet} />
            Wallet
          {/* </NavLink> */}
        </ListItem>

        <ListItem
          color={location.pathname === "/services" ? "#A210C6" : ""}
          textDecoration={location.pathname === "/services" ? "underline" : ""}
       
        >
          <NavLink to="/services">
            <ListIcon as={AiOutlineTool} />
            Services
          </NavLink>
        </ListItem>

        <ListItem
          marginLeft="15px"
          color={location.pathname === "/settings" ? "#A210C6" : ""}
          textDecoration={location.pathname === "/settings" ? "underline" : ""}
         
        >
          <NavLink to="/settings">
            <ListIcon as={AiOutlineSetting} />
            Settings
          </NavLink>
        </ListItem>

        <Spacer />

        <ListItem
          onClick={handleOpenLogoutModal}
         
          marginLeft="10px"
          style={{
            marginTop: "100px",
          }}
          textDecoration={location.pathname === "/logout" ? "underline" : ""}
         
        >
          <NavLink>
            <ListIcon as={AiOutlineLogout} />
            Logout
          </NavLink>
        </ListItem>
      </List>
      <Box
        borderRight="2px solid #A210C6"
        height="100%"
        marginX={3}
        // marginTop="-5px"
      />
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </Flex>
  );
}
