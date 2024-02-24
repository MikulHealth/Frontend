import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import serviceIcon from "../../assets/ServiceIcon.svg";
import LogoutModal from "../sections/LogoutModal";
import {
  ChakraProvider,
  VStack,
  useToast,
  Image,
  Box,
  Text,
  Flex,
  extendTheme,
} from "@chakra-ui/react";

import logo from "../../assets/LogoColoured.svg";
import SettingsIcon from "../../assets/SettingsIcon.svg";
import LogoutIcon from "../../assets/Logout.svg";
import AppointmentsIcon from "../../assets/AppointmentIcon.svg";
import HomeIcon from "../../assets/HomeBlack.svg";
import Wallet from "../../assets/Wallet.svg";

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

const LeftSideBar = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem("token");
    localStorage.removeItem("phoneNumber");
    navigate("/");
  };

  const iconStyle = {
    marginRight: "10px",
    height: "24px",
    width: "24px",
  };

  const listTextStyle = {
    marginTop: "5px",
    marginLeft: "5px",
  };

  const listItemStyle = {
    fontStyle: "body",
    fontSize: "16px",
    marginBottom: "30px",
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Box position="fixed" width="20%" p={3} h="100vh">
        <Image
          src={logo}
          alt="Logo"
          w="160px"
          h="60px"
          marginLeft="60px"
          marginTop="10px"
        />
        <VStack marginTop="45px">
          <VStack spacing={3} align="left" mt={5}>
            <NavLink to="/dashboard" style={listItemStyle}>
              <Flex
                color={location.pathname === "/dashboard" ? "#A210C6" : ""}
                textDecoration={
                  location.pathname === "/dashboard" ? "underline" : ""
                }
                alignItems="center"
              >
                <Image src={HomeIcon} alt="home" style={iconStyle} />
                <Text style={listTextStyle}>Home</Text>
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
                <Image src={AppointmentsIcon} alt="home" style={iconStyle} />
                <Text style={listTextStyle}>Appointments</Text>
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
                <Image src={Wallet} alt="wallet" style={iconStyle} />
                <Text style={listTextStyle}>Wallet</Text>
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
                <Image src={serviceIcon} alt="services" style={iconStyle} />
                <Text style={listTextStyle}>Services</Text>
              </Flex>
            </NavLink>

            <NavLink to="/settings" style={listItemStyle}>
              <Flex
                style={listTextStyle}
                marginLeft="5px"
                textDecoration={
                  location.pathname === "/settings" ||
                  location.pathname === "/edit-profile" ||
                  location.pathname === "/change-password" ||
                  location.pathname === "/notification-settings" ||
                  location.pathname === "/help"
                    ? "underline"
                    : ""
                }
                color={
                  location.pathname === "/settings" ||
                  location.pathname === "/edit-profile" ||
                  location.pathname === "/change-password" ||
                  location.pathname === "/notification-settings" ||
                  location.pathname === "/help"
                    ? "#A210C6"
                    : ""
                }
              >
                <Image src={SettingsIcon} alt="settings" style={iconStyle} />
                <Text style={listTextStyle}>Settings</Text>
              </Flex>
            </NavLink>

            <Box marginTop="70px">
              <NavLink onClick={handleOpenLogoutModal} style={listItemStyle}>
                <Flex color="#A210C6">
                  <Image src={LogoutIcon} alt="logout" style={iconStyle} />
                  <Text
                    style={listTextStyle}
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
          </VStack>
        </VStack>

        <Box
          borderRight="2px solid #A210C6"
          height="104%"
          marginX={3}
          marginTop="-610px"
        />
      </Box>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </ChakraProvider>
  );
};
export default LeftSideBar;
