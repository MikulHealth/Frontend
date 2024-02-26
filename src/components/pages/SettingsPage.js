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
  return (
    <ChakraProvider theme={customTheme}>
      <LeftSideBar />
      <VStack marginLeft="280px" w="70%" h="100vh">
        <NavBar />
        <Flex marginTop="-30px" marginLeft="-250px">
          <SettingsSideBar />
          <Box marginTop="20px">
            <Image
              src={BigSettingsIcon}
              alt="Settings Icon"
              boxSize="50px"
              h="456px"
              w="488px"
            />
          </Box>
        </Flex>
      </VStack>
    </ChakraProvider>
  );
};
export default SettingsPage;
