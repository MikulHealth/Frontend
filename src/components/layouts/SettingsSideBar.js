import React from "react";
import {
  Flex,
  Text,
  Divider,
  Box,
  Image,
  VStack 
} from "@chakra-ui/react";
import {
  SettingsIcon,
  LockIcon,
  BellIcon,
  QuestionIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import { NavLink, useLocation } from "react-router-dom";

export default function SettingsSideBar() {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  const activeStyle = {
    color: "#A210C6",
  };

  return (
    <Flex>
      <Box  p={3}>
        <VStack>
          <Text fontFamily="heading" fontSize="24px">
            Account
          </Text>
          <Flex flexDirection="column">
            <NavLink to="/edit-profile">
              <Flex
                alignItems="center"
                marginTop="25px"
                style={{ cursor: "pointer" }}
                _hover={activeStyle}
                {...(isActive("/edit-profile") && { color: "#A210C6" })}
              >
                <SettingsIcon boxSize={8} />
                <Text marginBottom="5px" fontSize="20px" marginLeft="10px" marginTop="10px">
                  Profile
                </Text>
                <ChevronRightIcon marginLeft="auto" />
              </Flex>
            </NavLink>
            <Divider my={1} borderColor="black.500" />

            <NavLink to="/change-password">
              <Flex
                alignItems="center"
                marginTop="25px"
                style={{ cursor: "pointer" }}
                _hover={activeStyle}
                {...(isActive("/change-password") && { color: "#A210C6" })}
              >
                <LockIcon boxSize={8} />
                <Text marginBottom="5px" fontSize="20px" marginLeft="10px" marginTop="10px">
                  Change password
                </Text>
                <ChevronRightIcon marginLeft="auto" />
              </Flex>
            </NavLink>
            <Divider my={1} borderColor="black.500" />

            <NavLink to="/notification-settings">
              <Flex
                alignItems="center"
                marginTop="25px"
                style={{ cursor: "pointer" }}
                _hover={activeStyle}
                {...(isActive("/notification-settings") && { color: "#A210C6" })}
              >
                <BellIcon boxSize={8} />
                <Text marginBottom="5px" fontSize="20px" marginLeft="10px" marginTop="10px">
                  Notification Settings
                </Text>
                <ChevronRightIcon marginLeft="auto" />
              </Flex>
            </NavLink>
            <Divider my={1} borderColor="black.500" />

            <NavLink to="/help">
              <Flex
                alignItems="center"
                marginTop="25px"
                style={{ cursor: "pointer" }}
                _hover={activeStyle}
                {...(isActive("/help") && { color: "#A210C6" })}
              >
                <QuestionIcon boxSize={8} />
                <Text marginBottom="5px" fontSize="20px" marginLeft="10px" marginTop="10px">
                  Help
                </Text>
                <ChevronRightIcon marginLeft="auto" />
              </Flex>
            </NavLink>
            <Divider my={1} borderColor="black.500" />
          </Flex>
        </VStack>
      </Box>
      <Box />
     
    </Flex>
  );
}
