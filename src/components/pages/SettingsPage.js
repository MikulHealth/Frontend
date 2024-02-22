import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SideBar from "../layouts/SideBar";
import NavBar from "../layouts/NavBar";
import {
  ChakraProvider,
  VStack,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  Image,
  Box,
  Text,
  Flex,
  Link,
  Divider,
  Select,
  InputGroup,
  InputLeftAddon,
  FormControl,
  extendTheme,
  FormLabel,
} from "@chakra-ui/react";

import SettingsSideBar from "../layouts/SettingsSideBar";
import BigSettingsIcon from "../../assets/BigSettingsIcon.svg";
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
  return (
    <ChakraProvider theme={customTheme}>
      <Flex overflow="hidden" height="100vh" w="100vw">
        <SideBar />
        <VStack w="75%" h="100vh">
          <NavBar />
          <Flex marginTop="-7px" marginLeft="-200px">
            <SettingsSideBar />
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
      </Flex>
    </ChakraProvider>
  );
};
export default SettingsPage;
