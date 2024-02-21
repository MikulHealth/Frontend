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
  import { BellIcon } from "@chakra-ui/icons";
  import React, { useState, useEffect } from "react";
  import { useNavigate, useLocation } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { SetUser } from "../../redux/userSlice";
  import { GetCurrentUser } from "../../apiCalls/UserApis";
  import UserDetailsModal from "../sections/UserDetails";
  import NotificationIcon from "../../assets/notification.svg";
  
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
  
    useEffect(() => {
      const fetchData = async () => {
        if (localStorage.getItem("token")) {
          try {
            const response = await GetCurrentUser();
  
            if (response.success) {
              dispatch(SetUser(response.data));
            } else {
              console.error("API request failed:", response.error);
            }
          } catch (error) {
            console.error("Error in GetCurrentUser API:", error);
          } finally {
          }
        } else {
          navigate("/login");
        }
      };
  
      fetchData();
    }, []);
  
    // Map page titles to their respective headings
    const pageTitles = {
      "/dashboard": "Dashboard",
      "/appointment": "Appointments",
      "/wallet": "Wallet",
      "/services": "Services",
      "/settings": "Settings",
      "/logout": "Logout",
    };

    const pageTitle = pageTitles[location.pathname] || "Unknown Page";
  
    const isDashboard = location.pathname === "/dashboard";
  
    return (
      <Flex marginTop="15px" as="nav" p="10px" width={{ base: "100%" }} alignItems="center">
        <Box>
          {isDashboard ? (
            <>
              <Heading color="#A210C6">Hello {user?.firstName},</Heading>
              <Text marginLeft="-52px">How are you doing today?</Text>
            </>
          ) : (
            <Heading color="#A210C6">{pageTitle}</Heading>
          )}
        </Box>
        <Spacer />
        <HStack spacing="20px" marginRight="30px">
          <Box>
            <Image
              src={NotificationIcon}
              alt="Notification icon"
              h="40px"
              w="30px"
              style={{
                cursor: "pointer",
              }}
            />
          </Box>
          <Avatar
            style={{
              cursor: "pointer",
            }}
            onClick={handleOpenUserDetailsModal}
            src={user?.image}
            name={user?.firstName}
            bg="#A210C6"
          ></Avatar>
          <Box></Box>
        </HStack>
        <UserDetailsModal
          isOpen={showUserDetailsModal}
          onClose={handleCloseUserDetailsModal}
        />
      </Flex>
    );
  }
  