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
import { FaFirstAid } from "react-icons/fa";
import logo from "../../assets/LogoColoured.svg";
import { AiOutlineMedicineBox } from "react-icons/ai";
import {
  Avatar,
  HStack,
  Heading,
  Spacer,
  Box,
  Text,
  useToast,
  Flex,
  extendTheme,
  Image,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

const customTheme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Gill Sans MT, sans-serif",
  },
});

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const toast = useToast();

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem("token");
    localStorage.removeItem("phoneNumber");
    toast({
      title: "Logout successful",
      description: "",
      status: "success",
      duration: 5000,
      isClosable: true,

      icon: <LockIcon />,
    });
    navigate("/");
  };
  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const iconStyle = {
    fontSize: "30px",
    marginRight: "10px",
  };

  const listItemStyle = {
    fontSize: "24px",
    marginBottom: "30px",
  };

  return (
    <Flex justifyContent="space-between">
      <Flex
        theme={customTheme}
        width="25%"
        as="sidebar"
        p="10px"
        h="100vh"
        flexDirection="column"
        justifyContent="space-between"
        paddingLeft="70px"
        spacing={4}
      >
        <Flex flexDirection="column">
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
          <NavLink  to="/dashboard" style={listItemStyle}>
            <Flex
              color={location.pathname === "/dashboard" ? "#A210C6" : ""}
              textDecoration={
                location.pathname === "/dashboard" ? "underline" : ""
              }
              alignItems="center"
            >
              <AiOutlineHome style={iconStyle} />
              <Text marginLeft="5px">Home</Text>
            </Flex>
          </NavLink>
         
          <NavLink to="/appointment" style={listItemStyle}>
            <Flex
              color={location.pathname === "/appointment" ? "#A210C6" : ""}
              textDecoration={
                location.pathname === "/appointment" ? "underline" : ""
              }
              alignItems="center"
            >
              <AiOutlineCalendar style={iconStyle} />
              <Text marginLeft="5px">Appointments</Text>
            </Flex>
          </NavLink>
        
          <NavLink to="/wallet" style={listItemStyle}>
            <Flex
              color={location.pathname === "/wallet" ? "#A210C6" : ""}
              textDecoration={
                location.pathname === "/wallet" ? "underline" : ""
              }
              alignItems="center"
            >
              <AiOutlineWallet style={iconStyle} />
              <Text marginLeft="5px">Wallet</Text>
            </Flex>
          </NavLink>
        
          <NavLink to="/services" style={listItemStyle}>
            <Flex
              color={
                location.pathname === "/services" ||
                location.pathname === "/customize-service"
                  ? "#A210C6"
                  : ""
              }
              textDecoration={
                location.pathname === "/services" ||
                location.pathname === "/customize-service"
                  ? "underline"
                  : ""
              }
              alignItems="center"
            >
              <AiOutlineMedicineBox style={iconStyle} />
              <Text marginLeft="5px">Services</Text>
            </Flex>
          </NavLink>
       
          <NavLink to="/settings" style={listItemStyle}>
            <Flex
              color={location.pathname === "/settings" ? "#A210C6" : ""}
              textDecoration={
                location.pathname === "/settings" ? "underline" : ""
              }
              alignItems="center"
            >
              <AiOutlineSetting style={iconStyle} />
              <Text marginLeft="5px">Settings</Text>
            </Flex>
          </NavLink>
        </Flex>
        <Box>
          <NavLink onClick={handleOpenLogoutModal} style={listItemStyle}>
            <Flex alignItems="center">
              <AiOutlineLogout style={iconStyle} />
              <Text
                textDecoration={
                  location.pathname === "/logout" ? "underline" : ""
                }
                marginLeft="5px"
              >
                Logout
              </Text>
            </Flex>
          </NavLink>
        </Box>

        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleConfirmLogout}
        />
      </Flex>
      <Box
        borderRight="2px solid #A210C6"
        height="100%"
        marginX={3}
       
      />
    </Flex>
  );
}
