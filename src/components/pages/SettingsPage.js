import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SideBar from "../authLayouts/SideBar";
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
  return (
    <ChakraProvider theme={customTheme}>
        <NavBar />
      <Flex position="fixed" height="100vh" w="100vw">
        <SideBar />
        <VStack w="75%" h="100vh">
        
          <Flex  marginLeft="-208px">
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
