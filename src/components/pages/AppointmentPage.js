import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import BookAppointmentModal from "../sections/BookAppointment";
import { SearchIcon } from "@chakra-ui/icons";
import LeftSideBar from "../authLayouts/LeftSideBar";
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
import { CheckIcon } from "@chakra-ui/icons";
import familyIcon from "../../assets/family.svg";
import SearchAppointmentsModal from "../sections/SearchAppointmentByDate";
import SideBar from "../authLayouts/SideBar";
import NavBar from "../authLayouts/NavBar";
import Help from "../authLayouts/Help";
import AppointmentTab from "../authLayouts/AllAppointmentTab";
import PendingApp from "../authLayouts/PendingAppointmentTab";

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

  const pageStyle = {
    animation: "slideIn 0.5s ease-in-out",
  };

  const settingsContainerStyle = {
    animation: "slideInUp 0.5s ease-in-out",
  };

  return (
    <ChakraProvider theme={customTheme}>
      <LeftSideBar />
      <VStack
        style={settingsContainerStyle}
        position="fixed"
        marginLeft="270px"
        w="70%"
        h="100vh"
      >
        <NavBar />
        <Box
         
          marginTop="10px"
          border="1px solid gray"
          borderRadius="md"
          padding="3px"
          w="70vw"
        >
          <Flex>
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
          marginTop="10px"
          bg="#A210C6"
          w="70vw"
          h="30vh"
          borderRadius="20px"
        >
          <VStack color="white">
            <Text
              fontSize="20px"
              fontFamily="heading"
              marginTop="15px"
              marginLeft="-98px"
            >
              Hello {user?.firstName},
            </Text>
            <Text
              fontFamily="body"
              fontSize="15px"
              marginLeft="43px"
              marginTop="5px"
            >
              Would you like to book an appointment
            </Text>
            <Text
              fontFamily="body"
              fontSize="15px"
              marginTop="2px"
              marginLeft="-36px"
            >
              for yourself or a loved one?
            </Text>

            <Button
              onClick={handleOpenAppointmentModal}
              bg="white"
              color="#A210C6"
              fontFamily="body"
              marginTop="10px"
              _hover={{ color: "" }}
              marginLeft="-40px"
              borderRadius="100px"
              leftIcon={<CheckIcon />}
            >
              Book appointment
            </Button>
          </VStack>
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

        <Flex
          marginLeft="-60px"
          justifyContent="space-between"
          className="appointment-tabs"
        >
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
        </Flex>
        <BookAppointmentModal
          isOpen={showAppointmentModal}
          onClose={handleCloseAppointmentModal}
        />
        <SearchAppointmentsModal
          isOpen={showSearchAppointmentsModal}
          onClose={handleCloseSearchAppointmentsModal}
        />
      </VStack>
    </ChakraProvider>
  );
};

export default AppointmentPage;
