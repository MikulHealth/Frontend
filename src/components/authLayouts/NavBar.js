import {
  Avatar,
  Heading,
  Spacer,
  Box,
  Text,
  Flex,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserDetailsModal from "../sections/UserDetails";

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

export default function NavBar() {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/appointment": "Appointments",
    "/wallet": "Wallet",
    "/services": "Services",
    "/settings": "Settings",
    "/logout": "Logout",
    "/customize-service": "Customize Service",
    "/edit-profile": "Settings",
    "/change-password": "Settings",
    "/notification-settings": "Settings",
    "/help": "Help",
  };

  const pageTitle = pageTitles[location.pathname] || "Unknown Page";
  const isDashboard = location.pathname === "/dashboard";

  return (
    <ChakraProvider theme={customTheme}>
      <Flex
        alignItems="center"
        p="10px"
        marginTop="20px"
        direction={{ base: "row", md: "row" }}
        justifyContent="space-between"
        width="100%"
        px={{ base: "10px", md: "20px" }}
      >
        <Box>
          {isDashboard ? (
            <Flex flexDirection={{ base: "column", md: "row" }}>
              <Heading fontSize={{ base: "16", md: "24px" }} color="#A210C6" fontWeight="bold">
                Hello {user?.firstName},
              </Heading>
              <Text
                fontStyle="italic"
                marginLeft={{ base: "10px", md: "5px" }}
                fontFamily="Montserrat, sans-serif"
                fontSize={{ base: "10px", md: "16px" }}
                marginTop={{ base: "5px", md: "5px" }}
              >
                How are you doing today?
              </Text>
            </Flex>
          ) : (
            <Heading fontSize="24px" color="#A210C6" fontWeight="bold">
              {pageTitle}
            </Heading>
          )}
        </Box>
        <Box
          style={{ cursor: "pointer" }}
          onClick={handleOpenUserDetailsModal}
          display={{ base: "block", md: "flex" }} // Ensure Avatar is always visible
        >
          <Avatar
            borderRadius="full"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            size={{ base: "sm", md: "md" }} 
            marginTop={{ base: "5px", md: "0" }}
            src={user?.image}
            name={user?.firstName}
            bg="#A210C6"
          />
        </Box>
      </Flex>
      <UserDetailsModal
        isOpen={showUserDetailsModal}
        onClose={handleCloseUserDetailsModal}
      />
    </ChakraProvider>
  );
}
