import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import WebIcon from "../../assets/WebIcon.svg";
import EmailIcon from "../../assets/EmailIcon.svg";
import TextIcon from "../../assets/TextIcon.svg";
import NavBar from "../authLayouts/NavBar";
import {
  ChakraProvider,
  VStack,
  useToast,
  Image,
  Box,
  Text,
  Flex,
  Switch,
  extendTheme,
} from "@chakra-ui/react";
import SettingsSideBar from "../authLayouts/SettingsSideBar";
import LeftSideBar from "../authLayouts/LeftSideBar";
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

  const settingsContainerStyle = {
    animation: "slideInUp 0.9s ease-in-out",
  };

  return (
    <ChakraProvider theme={customTheme}>
      <LeftSideBar />
      <VStack
        style={settingsContainerStyle}
        position="fixed"
        marginLeft="280px"
        w="70%"
        h="100vh"
      >
        <NavBar />
        <Flex mt={{ md: "30px" }} ml={{ base: "50px", md: "-250px" }}>
          <SettingsSideBar />
          <Box
            marginTop="10px"
            className="notification-settings"
            marginLeft="50px"
            p={3}
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
      </VStack>
    </ChakraProvider>
  );
};
export default NotificationSettingsPage;
