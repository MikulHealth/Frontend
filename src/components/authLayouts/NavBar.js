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
  Divider,
  ChakraProvider,
  VStack,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../redux/userSlice";
import { GetCurrentUser } from "../../apiCalls/UserApis";
import UserDetailsModal from "../sections/UserDetails";
import NotificationIcon from "../../assets/notification.svg";
import logo from "../../assets/Secondary logo.svg";
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (localStorage.getItem("token")) {
  //       try {
  //         const response = await GetCurrentUser();

  //         if (response.success) {
  //           dispatch(SetUser(response.data));
  //         } else {
  //           console.error("API request failed:", response.error);
  //         }
  //       } catch (error) {
  //         console.error("Error in GetCurrentUser API:", error);
  //       } finally {
  //       }
  //     } else {
  //       navigate("/login");
  //     }
  //   };

  //   fetchData();
  // }, []);

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
        h="20%"
        overflow="hidden"
        fontFamily="Gill Sans MT, sans-serif"
        as="h4"
        p="10px"
        width={{ base: "100%" }}
        alignItems="center"
        marginTop="-10px"
      >
        <Box marginLeft="20px">
          {isDashboard ? (
            <>
              <Flex marginLeft="30px">
                <Heading fontSize="24px" color="#A210C6" fontWeight="bold">
                  Hello {user?.firstName},
                </Heading>
                <Text
                  style={{
                    fontStyle: "italic",
                  }}
                  marginLeft="5px"
                  fontFamily="Montserrat, sans-serif"
                  fontSize="16px"
                  marginTop="5px"
                  // fontWeight="bold"
                >
                  How are you doing today?
                </Text>
              </Flex>
            </>
          ) : (
            <Heading
              marginLeft="-30px"
              fontSize="24px"
              color="#A210C6"
              fontWeight="bold"
            >
              {pageTitle}
            </Heading>
          )}
        </Box>
        <Spacer />
        <HStack spacing="20px" marginRight="30px">
          <Box
            style={{
              cursor: "pointer",
              borderRadius: "100%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Image
              h="30px"
              w="30px"
              style={{
                cursor: "pointer",
              }}
              src={NotificationIcon}
              alt="Notification icon"
            />
          </Box>
          <Box
            style={{
              cursor: "pointer",
              borderRadius: "100%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Avatar
              style={{
                cursor: "pointer",
              }}
              h="30px"
              w="30px"
              onClick={handleOpenUserDetailsModal}
              src={user?.image}
              name={user?.firstName}
              bg="#A210C6"
            ></Avatar>
          </Box>
        </HStack>

        <UserDetailsModal
          isOpen={showUserDetailsModal}
          onClose={handleCloseUserDetailsModal}
        />
      </Flex>
      {/* <Box borderBottom="2px solid #A210C6" w="100%" marginX={3} /> */}
      {/* <Divider my={2} borderColor="#A210C6" /> */}
      </ChakraProvider>
  );
}
