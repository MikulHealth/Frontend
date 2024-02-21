import React, { useState, useEffect } from "react";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../../redux/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RightArrow from "../../assets/RightArrow.svg";
import Help from "../../assets/Help.svg";

import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  VStack,
  Input,
  Button,
  useToast,
  Image,
  Box,
  extendTheme,
  Text,
  Flex,
  Link,
  Divider,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import userImageIcon from "../../assets/userImage.svg";
import NotificationIcon from "../../assets/notification.svg";
import familyIcon from "../../assets/family.svg";
import UserDetailsModal from "../sections/UserDetails";
import LoadingSpinner from "../../utils/Spiner";
import Wallet from "../../assets/Wallet.svg";
import logo from "../../assets/LogoColoured.svg";
import SettingsIcon from "../../assets/SettingsIconWhite.svg";
import LogoutIcon from "../../assets/Logout.svg";
import AppointmentsIcon from "../../assets/AppointmentIcon.svg";
import HomeIcon from "../../assets/HomeBlack.svg";
import ProfileIcon from "../../assets/ProfileIcone.svg";
import LogoutModal from "../sections/LogoutModal";
import PasswordIcon from "../../assets/PasswordIcon.svg";
import NotificationIconn from "../../assets/Notification.Icon.svg";
import serviceIcon from "../../assets/ServiceIcon.svg";
import BigSettingsIcon from "../../assets/BigSettingsIcon.svg";
import SideBar from "../layouts/SideBar";
import NavBar from "../layouts/NavBar";

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

const SettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleOpenHelpModal = () => {};

  const handleOpenWalletModal = () => {
    navigate("/wallet");
  };

  const help = () => {
    navigate("/help");
  };

  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    // Close the logout confirmation modal
    setShowLogoutModal(false);

    // Perform the actual logout
    localStorage.removeItem("token");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("orderId");
    navigate("/");
  };

  const handleOpenDashboard = () => {
    navigate("/dashboard");
  };

  const handleOpenEditProfileDashboard = () => {
    navigate("/edit-profile");
  };

  const handleOpenAppointmentsModal = () => {
    navigate("/appointment");
  };
  const handleChangePassowrdModal = () => {
    navigate("/change-password");
  };

  const handleOpenNotificationssModal = () => {
    navigate("/notification-settings");
  };

  const Services = () => {
    navigate("/services");
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Flex overflow="hidden" height="100vh" w="100vw">
        <SideBar />
        <VStack w="75%" h="100vh">
          <NavBar />
          <Flex>
            <Box marginLeft="-140px"  p={3}>
              <Text fontFamily="heading" marginLeft="-160px" fontSize="24px">
                Account
              </Text>

              <Box>
                <Flex
                  marginTop="25px"
                  style={{
                    cursor: "pointer",
                  }}
                  _hover={{ color: "#A210C6" }}
                  onClick={handleOpenEditProfileDashboard}
                >
                  <Image
                    src={ProfileIcon}
                    alt="Profile Icon"
                    boxSize="50px"
                    marginBottom="2%"
                    h="50px"
                    w="50px"
                    borderRadius="10%"
                  />
                  <Text fontSize="20px" marginLeft="5px" marginTop="10px">
                    Profile
                  </Text>
                  <Image
                    marginLeft="135px"
                    marginTop="20px"
                    w="10px"
                    h="15px"
                    src={RightArrow}
                    alt="right arrow"
                  />
                </Flex>
                <Divider my={1} borderColor="black.500" />
              </Box>
              <Box>
                {" "}
                <Flex
                  marginTop="25px"
                  style={{
                    cursor: "pointer",
                  }}
                  _hover={{ color: "#A210C6" }}
                  onClick={handleChangePassowrdModal}
                >
                  <Image
                    src={PasswordIcon}
                    alt="Password Icon"
                    boxSize="50px"
                    marginBottom="2%"
                    h="50px"
                    w="50px"
                    borderRadius="10%"
                  />
                  <Text fontSize="20px" marginLeft="5px" marginTop="10px">
                    Change password
                  </Text>
                  <Image
                    marginLeft="32px"
                    marginTop="20px"
                    w="10px"
                    h="15px"
                    src={RightArrow}
                    alt="right arrow"
                  />
                </Flex>
                <Divider my={1} borderColor="black.500" />{" "}
              </Box>
              <Box>
                {" "}
                <Flex
                  marginTop="25px"
                  style={{
                    cursor: "pointer",
                  }}
                  _hover={{ color: "#A210C6" }}
                  onClick={handleOpenNotificationssModal}
                >
                  <Image
                    src={NotificationIconn}
                    alt="Notification Icon"
                    boxSize="50px"
                    marginBottom="2%"
                    h="50px"
                    w="50px"
                    borderRadius="10%"
                  />
                  <Text fontSize="20px" marginLeft="5px" marginTop="10px">
                    Notification Settings
                  </Text>
                  <Image
                    marginLeft="10px"
                    marginTop="20px"
                    w="10px"
                    h="15px"
                    src={RightArrow}
                    alt="right arrow"
                  />
                </Flex>
                <Divider my={1} borderColor="black.500" />{" "}
              </Box>

              <Box>
                {" "}
                <Flex
                  marginTop="25px"
                  style={{
                    cursor: "pointer",
                  }}
                  _hover={{ color: "#A210C6" }}
                  onClick={help}
                >
                  <Image
                    src={Help}
                    alt="Notification Icon"
                    boxSize="50px"
                    marginBottom="2%"
                    h="50px"
                    w="50px"
                    borderRadius="10%"
                  />
                  <Text fontSize="20px" marginLeft="5px" marginTop="10px">
                    Help
                  </Text>
                  <Image
                    marginLeft="145px"
                    marginTop="20px"
                    w="10px"
                    h="15px"
                    src={RightArrow}
                    alt="right arrow"
                  />
                </Flex>
                <Divider my={1} borderColor="black.500" />{" "}
              </Box>
            </Box>
            <Box marginLeft="70px" marginTop="20px">
              <Image
                src={BigSettingsIcon}
                alt="Settings Icon"
                boxSize="50px"
                // marginBottom="2%"
                h="456px"
                w="488px"
              />
            </Box>
          </Flex>
        </VStack>

        <UserDetailsModal
          isOpen={showUserDetailsModal}
          onClose={handleCloseUserDetailsModal}
        />
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleConfirmLogout}
        />
      </Flex>
    </ChakraProvider>
  );
};
export default SettingsPage;
