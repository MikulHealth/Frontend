import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import LeftSideBar from "../authLayouts/LeftSideBar";
import NavBar from "../authLayouts/NavBar";
import {
  ChakraProvider,
  VStack,
  Image,
  Box,
  Flex,
  extendTheme,
} from "@chakra-ui/react";

import SettingsSideBar from "../authLayouts/SettingsSideBar";
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
  const pageStyle = {
    animation: "slideIn 0.5s ease-in-out",
  };

  const settingsContainerStyle = {
    animation: "slideInUp 0.9s ease-in-out",
  };

  return (
    <ChakraProvider theme={customTheme}>
      <LeftSideBar />
      <VStack
        style={settingsContainerStyle}
        position="fixed"
        ml={{ md: "200px" }}
        w={{ base: "100%", md: "70%" }}
        h={{ base: "100%", md: "100%" }}
      >
        <NavBar />
        <Flex  mt={{ md: "30px" }} ml={{md:"-80px"}}>
          <SettingsSideBar />
          <Box mt={{ base: "100px", md: "20px" }}>
            <Image
              src={BigSettingsIcon}
              alt="Settings Icon"
              boxSize="50px"
              h={{ base: "256", md: "456px" }}
              w={{ base: "288px", md: "488px" }}
            />
          </Box>
        </Flex>
      </VStack>
    </ChakraProvider>
  );
};

export default SettingsPage;
