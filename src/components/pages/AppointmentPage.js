import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import BookAppointmentModal from "../sections/BookAppointment";
import { SearchIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  VStack,
  Button,
  useToast,
  Image,
  Box,
  Text,
  Flex,
  extendTheme,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import familyIcon from "../../assets/family.svg";
import SearchAppointmentsModal from "../sections/SearchAppointmentByDate";
import SideBar from "../layouts/SideBar";
import NavBar from "../layouts/NavBar";
import Help from "../layouts/Help";
import AppointmentTab from "../layouts/AllAppointmentTab";
import PendingApp from "../layouts/PendingAppointmentTab";

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

const AppointmentPage = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showSearchAppointmentsModal, setShowSearchAppointmentsModal] =
    useState(false);
  const handleOpenAppointmentModal = () => {
    setShowAppointmentModal(true);
  };

  const handleOpenSearchAppointmentsModal = () => {
    setShowSearchAppointmentsModal(true);
  };

  const handleCloseSearchAppointmentsModal = () => {
    setShowSearchAppointmentsModal(false);
  };

  const handleCloseAppointmentModal = () => {
    setShowAppointmentModal(false);
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Flex overflow="hidden" height="100vh" w="100vw">
        <SideBar />

        <VStack w="75%" h="100vh">
          <NavBar />

          <Box
            marginLeft="-10"
            marginTop="10px"
            border="1px solid gray"
            borderRadius="md"
            padding="3px"
            w="70vw"
          >
            <Flex marginLeft="10px">
              <SearchIcon boxSize={4} marginRight="10px" marginTop="5px" />
              <Text
                fontSize="16px"
                fontFamily="body"
                style={{
                  marginLeft: "5px",
                  marginTop: "2px",
                  fontStyle: "italic",
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
                onClick={handleOpenSearchAppointmentsModal}
              >
                Search Appointment by date
              </Text>
            </Flex>
          </Box>
          <Flex
            marginTop="20px"
            marginLeft="-10"
            bg="#A210C6"
            w="70vw"
            h="30vh"
            borderRadius="20px"
          >
            <Box marginLeft="-30px" color="white">
              <Text
                fontSize="20px"
                fontFamily="heading"
                marginTop="15px"
                marginLeft="-60px"
              >
                Hello {user?.firstName},
              </Text>
              <Text
                fontFamily="body"
                fontSize="15px"
                marginLeft="83px"
                marginTop="5px"
              >
                Would you like to book an appointment
              </Text>
              <Text
                fontFamily="body"
                fontSize="15px"
                marginTop="2px"
                marginLeft="6px"
              >
                for yourself or a loved one?
              </Text>

              <Button
                onClick={handleOpenAppointmentModal}
                bg="white"
                color="#A210C6"
                fontFamily="body"
                marginTop="30px"
                _hover={{ color: "" }}
                marginLeft="-20px"
                borderRadius="100px"
              >
                Book appointment
              </Button>
            </Box>
            <Box>
              <Image
                src={familyIcon}
                alt="family icon"
                h="150px"
                w="150px"
                marginTop="20px"
                marginBottom="10px"
                marginLeft="400px"
              />
            </Box>
          </Flex>

          <Box marginLeft="-350px" className="appointment-tabs">
            <VStack>
              <Tabs colorScheme="purple.100" mt="40px">
                <TabList justifyContent="space-between">
                  <Tab>All</Tab>

                  <Tab>Pending</Tab>

                  <Tab>Active</Tab>

                  <Tab>Completed</Tab>
                </TabList>
                <TabPanels marginLeft="-30px">
                  <TabPanel>
                    <AppointmentTab />
                  </TabPanel>
                  <TabPanel>
                    <PendingApp />
                  </TabPanel>
                  <TabPanel>
                    <PendingApp />
                  </TabPanel>
                  <TabPanel>
                    <PendingApp />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
            <Help />
          </Box>
          <BookAppointmentModal
            isOpen={showAppointmentModal}
            onClose={handleCloseAppointmentModal}
          />
          <SearchAppointmentsModal
            isOpen={showSearchAppointmentsModal}
            onClose={handleCloseSearchAppointmentsModal}
          />
        </VStack>
      </Flex>
    </ChakraProvider>
  );
};

export default AppointmentPage;
