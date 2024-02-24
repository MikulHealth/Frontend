import React, { useState, useEffect } from "react";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../../redux/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RightArrow from "../../assets/RightArrow.svg";
import Help from "../../assets/Help.svg";
import WebIcon from "../../assets/WebIcon.svg";
import EmailIcon from "../../assets/EmailIcon.svg";
import TextIcon from "../../assets/TextIcon.svg";
import LogoutModal from "../sections/LogoutModal";
import SideBar from "../authLayouts/SideBar";
import NavBar from "../authLayouts/NavBar";
import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  VStack,
  Input,
  Button,
  useToast,
  Image,
  Box,
  Text,
  Flex,
  Link,
  Divider,
  Switch,
  FormControl,
  extendTheme,
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
import ProfileIconWhite from "../../assets/ProfileIconWh.svg";
import PasswordIcon from "../../assets/PasswordIcon.svg";
import HelppIcon from "../../assets/HelppIcon.svg";
import NotificationIconn from "../../assets/ColoredNotificationIcon.svg";
import Bar from "../../assets/ColoredBar.svg";
import SearchAppointmentsModal from "../sections/SearchAppointmentByDate";
import serviceIcon from "../../assets/ServiceIcon.svg";
import SettingsSideBar from "../authLayouts/SettingsSideBar";

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

const NotificationSettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const [webAppNotification, setWebAppNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [textNotification, setTextNotification] = useState(false);

  const handleWebAppNotificationChange = () => {
    // Update the state
    setWebAppNotification(!webAppNotification);

    // Make an API call to update the backend with the new setting
    // You may need to replace 'updateWebAppNotificationSetting' with your actual API call
    // The second parameter (true/false) represents the new setting
    // updateWebAppNotificationSetting(!webAppNotification);
  };
  const handleEmailNotificationChange = () => {
    // Update the state
    setEmailNotification(!emailNotification);

    // Make an API call to update the backend with the new setting
    // You may need to replace 'updateWebAppNotificationSetting' with your actual API call
    // The second parameter (true/false) represents the new setting
    // updateWebAppNotificationSetting(!webAppNotification);
  };
  const handleTextppNotificationChange = () => {
    // Update the state
    setTextNotification(!textNotification);

    // Make an API call to update the backend with the new setting
    // You may need to replace 'updateWebAppNotificationSetting' with your actual API call
    // The second parameter (true/false) represents the new setting
    // updateWebAppNotificationSetting(!webAppNotification);
  };

  useEffect(() => {
    // Fetch the user's notification settings from the backend
    // Replace 'fetchNotificationSettings' with your actual API call
    // Update the state accordingly
    // const notificationSettings = fetchNotificationSettings();
    // setWebAppNotification(notificationSettings.webApp);
    // setEmailNotification(notificationSettings.email);
    // setTextNotification(notificationSettings.text);
  }, []);

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
  const handleOpenSettingsModal = () => {
    navigate("/settings");
  };

  const handleOpenAppointmentsModal = () => {
    navigate("/appointment");
  };

  const handleChangePassowrdModal = () => {
    navigate("/change-password");
  };

  const help = () => {
    navigate("/help");
  };

  const Services = () => {
    navigate("/services");
  };

  return (
    <ChakraProvider theme={customTheme}>
      <NavBar />
      <Flex position="fixed" height="100vh" w="100vw">
        <SideBar />
        <Box w="75%" h="100vh">
          <Flex>
            <SettingsSideBar />
            <Box
              marginTop="10px"
              className="notification-settings"
              marginLeft="50px"
              width="35%"
              p={3}
              h="80vh"
            >
              {" "}
              <Text fontSize="20px">Notification settings</Text>{" "}
              <VStack spacing={4}>
                <Flex marginTop="30px" alignItems="center">
                  <Image
                    src={WebIcon}
                    alt="Web Icon"
                    boxSize="50px"
                    marginBottom="2%"
                    h="24px"
                    w="30px"
                    borderRadius="100%"
                  />
                  <Text marginLeft="10px" fontSize="16px">
                    WebApp Push Notifications
                  </Text>
                  <Switch
                    style={{
                      backgroundColor: webAppNotification
                        ? "purple.500"
                        : "gray.400",
                    }}
                    marginLeft="60px"
                    isChecked={webAppNotification}
                    onChange={handleWebAppNotificationChange}
                  />
                </Flex>
                <Text marginTop="-15px" marginLeft="20px" fontSize="14px">
                  Receive push notifications on appointments
                </Text>
                <Text marginTop="-15px" marginLeft="-95px" fontSize="14px">
                  {" "}
                  and updates via webapp.
                </Text>
                <Flex marginTop="5px" alignItems="center">
                  <Image
                    src={EmailIcon}
                    alt="Email Icon"
                    boxSize="50px"
                    marginBottom="2%"
                    h="24px"
                    w="30px"
                    borderRadius="100%"
                  />
                  <Text marginLeft="10px" fontSize="16px">
                    Email notifications
                  </Text>
                  <Switch
                    marginLeft="125px"
                    isChecked={emailNotification}
                    onChange={handleEmailNotificationChange}
                  />
                </Flex>
                <Text marginTop="-15px" marginLeft="20px" fontSize="14px">
                  Receive push notifications on appointments
                </Text>
                <Text marginTop="-15px" marginLeft="-112px" fontSize="14px">
                  {" "}
                  and updates via email
                </Text>
                <Flex marginLeft="3px" marginTop="5px" alignItems="center">
                  <Image
                    src={TextIcon}
                    alt="Text Icon"
                    boxSize="50px"
                    marginBottom="2%"
                    h="24px"
                    w="30px"
                    borderRadius="100%"
                  />
                  <Text marginLeft="10px" fontSize="16px">
                    Text message notifications
                  </Text>
                  <Switch
                    marginLeft="70px"
                    isChecked={textNotification}
                    onChange={handleTextppNotificationChange}
                  />
                </Flex>
                <Text marginTop="-15px" marginLeft="20px" fontSize="14px">
                  Receive push notifications on appointments
                </Text>
                <Text marginTop="-15px" marginLeft="-123px" fontSize="14px">
                  {" "}
                  and updates via text
                </Text>
              </VStack>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};
export default NotificationSettingsPage;
