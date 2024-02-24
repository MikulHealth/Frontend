import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import LogoutModal from "../sections/LogoutModal";
import HomeIcon from "../../assets/HomeBlack.svg";
import SettingsIcon from "../../assets/SettingsIcon.svg";
import LogoutIcon from "../../assets/Logout.svg";
import AppointmentsIcon from "../../assets/AppointmentIcon.svg";
import Wallet from "../../assets/WalletWhite.svg";
import logo from "../../assets/Secondary logo.svg";
import {
  Box,
  Text,
  useToast,
  Flex,
  extendTheme,
  Image,
} from "@chakra-ui/react";

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

export default function TopBar() {
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
    <div>
      <Flex justifyContent="space-between">
        <Flex
          theme={customTheme}
          width="20%"
          as="sidebar"
          p="10px"
          h="80%"
          flexDirection="column"
          justifyContent="space-between"
          paddingLeft="70px"
          spacing={3}
        >
          <Image
            src={logo}
            alt="Logo"
            w="200px"
            h="58px"
            onClick={reloadPage}
            style={{
              cursor: "pointer",
            }}
            _hover={{ color: "" }}
          />

          <Flex marginTop="40px" flexDirection="column">
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
                 <Image src={SettingsIcon} alt="services" style={iconStyle} />
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

            
          </Flex>
          <Box marginTop="20px">
            <NavLink onClick={handleOpenLogoutModal} style={listItemStyle}>
              <Flex color="red.500">
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

          <LogoutModal
            isOpen={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
            onConfirm={handleConfirmLogout}
          />
        </Flex>
        <Box borderRight="2px solid #A210C6" height="100%" marginX={3} />
      </Flex>
    </div>
  );
}
