import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ElderlyCareModal from "../sections/ElderlyCareModal";
import PostpartumCareModal from "../sections/PostpartumCareModal";
import RecoveryCareModal from "../sections/RecoveryCareModal";
import NannyCareModal from "../sections/NannyCareModal";
import ShortNurseVisitModal from "../sections/ShortNurseVisitModal";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  VStack,
  Image,
  Box,
  Text,
  Flex,
  extendTheme,
} from "@chakra-ui/react";

import SideBar from "../layouts/SideBar";
import NavBar from "../layouts/NavBar";
import HelppIcon from "../../assets/HelppIcon.svg";

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

const ServicePage = () => {
  const [showElderlyCareModal, setShowElderlyCareModal] = useState(false);
  const [showPostpartumCareModal, setShowPostpartumCareModal] = useState(false);
  const [showRecoveryCareModal, setShowRecoveryCareModal] = useState(false);
  const [showNannyCareModal, setShowNannyCareModal] = useState(false);
  const [showShortCareModal, setShowShortCareModal] = useState(false);

  const handleOpenElderlyCareModal = () => {
    setShowElderlyCareModal(true);
  };

  const handleOpenRecoveryCareModal = () => {
    setShowRecoveryCareModal(true);
  };

  const handleOpenPostpatumCareModal = () => {
    setShowPostpartumCareModal(true);
  };

  const handleOpenNannyCareModal = () => {
    setShowNannyCareModal(true);
  };

  const handleOpenShortCareModal = () => {
    setShowShortCareModal(true);
  };

  const services = [
    { title: "Elderly care", onClick: handleOpenElderlyCareModal },
    { title: "Postpartum care", onClick: handleOpenPostpatumCareModal },
    { title: "Recovery care", onClick: handleOpenRecoveryCareModal },
    { title: "Nanny services", onClick: handleOpenNannyCareModal },
    { title: "Short home visit", onClick: handleOpenShortCareModal },
    // Add more services as needed
  ];

  return (
    <ChakraProvider theme={customTheme}>
      <Flex overflow="hidden" height="100vh" w="100vw">
        <SideBar />

        <VStack w="75%" h="100vh">
          <NavBar />

          <Box marginLeft="-120px" marginTop="15px">
            {services.map((service, index) => (
              <Box
                key={index}
                marginTop="20px"
                marginLeft="8px"
                h="10vh"
                w="65vw"
                borderRadius="15px"
                paddingBottom="5px"
                style={{
                  cursor: "pointer",
                  boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
                }}
                _hover={{ color: "#A210C6" }}
                onClick={service.onClick}
              >
                <Flex>
                  <Box marginLeft="30px" marginTop="15px">
                    <Text fontSize="20px">{service.title}</Text>
                  </Box>
                  <ChevronRightIcon 
                    marginLeft="820px"
                    marginTop="15px"
                    w="30px"
                    h="30px"
                    color="#A210C6" 
                    position="absolute" 
                  />
                </Flex>
              </Box>
            ))}
            <NavLink to="/customize-service">
              <Box
                marginTop="20px"
                marginLeft="8px"
                h="10vh"
                w="65vw"
                borderRadius="15px"
                paddingBottom="5px"
                style={{
                  cursor: "pointer",
                  boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
                }}
                _hover={{ color: "#A210C6" }}
              >
                <Flex>
                  <Box marginLeft="30px" marginTop="15px">
                    <Text fontSize="20px">Customize service</Text>
                  </Box>
                  <ChevronRightIcon 
                    marginLeft="820px"
                    marginTop="15px"
                    w="30px"
                    h="30px"
                    color="#A210C6"
                    position="absolute" 
                  />
                </Flex>
              </Box>
            </NavLink>
          </Box>
          <Box marginTop="-85px" marginLeft="900px">
            <NavLink to="/help">
              <Image
                src={HelppIcon}
                alt="Logo"
                w="70px"
                h="70px"
                style={{
                  cursor: "pointer",
                  animation: "zoomInOut 2s infinite alternate",
                }}
              />
            </NavLink>
            <style>
              {`
              @keyframes zoomInOut {
                0% {
                  transform: scale(1);
                }
                100% {
                  transform: scale(1.2);
                }
              }
            `}
            </style>
          </Box>
        </VStack>

        <ElderlyCareModal
          isOpen={showElderlyCareModal}
          onClose={() => setShowElderlyCareModal(false)}
        />
        <PostpartumCareModal
          isOpen={showPostpartumCareModal}
          onClose={() => setShowPostpartumCareModal(false)}
        />
        <NannyCareModal
          isOpen={showNannyCareModal}
          onClose={() => setShowNannyCareModal(false)}
        />
        <RecoveryCareModal
          isOpen={showRecoveryCareModal}
          onClose={() => setShowRecoveryCareModal(false)}
        />
        <ShortNurseVisitModal
          isOpen={showShortCareModal}
          onClose={() => setShowShortCareModal(false)}
        />
      </Flex>
    </ChakraProvider>
  );
};

export default ServicePage;
