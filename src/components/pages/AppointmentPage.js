import React, { useState, useEffect } from "react";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../../redux/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookAppointmentModal from "../sections/BookAppointment";
import AllAppointments from "../sections/AllAppointments";
import CanceledAppointmentsModal from "../sections/CanceledAppointments";
import Help from "../../assets/Help.svg";
import axios from "axios";
import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  VStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Progress,
  Button,
  useToast,
  Image,
  Box,
  Text,
  Flex,
  extendTheme,
  Link,
  FormControl,
  Divider,
  FormLabel,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import userImageIcon from "../../assets/userImage.svg";
import NotificationIcon from "../../assets/notification.svg";
import familyIcon from "../../assets/family.svg";
import UserDetailsModal from "../sections/UserDetails";
import LoadingSpinner from "../../utils/Spiner";
import Wallet from "../../assets/Wallet.svg";
import LogoutModal from "../sections/LogoutModal";
import logo from "../../assets/LogoColoured.svg";
import SettingsIcon from "../../assets/SettingsIcon.svg";
import LogoutIcon from "../../assets/Logout.svg";
import AppointmentsIcon from "../../assets/AppointmentWhite.svg";
import HomeIcon from "../../assets/HomeBlack.svg";
import SearchAppointmentsModal from "../sections/SearchAppointmentByDate";
import HelppIcon from "../../assets/HelppIcon.svg";
import serviceIcon from "../../assets/ServiceIcon.svg";
import SideBar from "../layouts/SideBar";
import NavBar from "../layouts/NavBar";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showViewAllModal, setShowViewAllModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showCanceledModal, setShowCanceledModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showSearchAppointmentsModal, setShowSearchAppointmentsModal] =
    useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [cancellingAppointmentId, setCancellingAppointmentId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

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

  const help = () => {
    navigate("/help");
  };

  const formattedCost = (cost) => {
    // Divide costOfService by 100 to represent the amount in naira
    const costInNaira = cost / 100;

    // Format the costOfService as naira with the last two zeros separated by a dot
    const formattedCost =
      "₦ " + costInNaira.toLocaleString("en-NG", { maximumFractionDigits: 2 });

    return formattedCost;
  };
  const fetchData = async (url) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.get(url, config);

      if (response.data.success) {
        setAppointments(response.data.data);
      } else {
        console.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        const response = await axios.get(url, config);

        if (response.data.success) {
          setAppointments(response.data.data);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllAppointments = async () => {
      await fetchData("http://localhost:8080/v1/appointment/allAppointments");
    };

    const fetchPendingAppointments = async () => {
      await fetchData(
        "http://localhost:8080/v1/appointment/pendingAppointments"
      );
    };

    const fetchActiveAppointments = async () => {
      await fetchData(
        "http://localhost:8080/v1/appointment/activeAppointments"
      );
    };

    const fetchCompletedAppointments = async () => {
      await fetchData(
        "http://localhost:8080/v1/appointment/completedAppointments"
      );
    };

    const fetchDataBasedOnTab = async () => {
      switch (selectedTab) {
        case 0:
          await fetchAllAppointments();
          break;
        case 1:
          await fetchPendingAppointments();
          break;
        case 2:
          await fetchActiveAppointments();
          break;
        case 3:
          await fetchCompletedAppointments();
          break;
        default:
          await fetchAllAppointments();
          break;
      }
    };

    fetchDataBasedOnTab();
  }, [selectedTab]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const fetchAndDisplayAppointmentDetails = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `http://localhost:8080/v1/appointment/findAppointmentDetails/${appointmentId}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(apiUrl, { headers });

      if (response && response.data && response.data.success) {
        console.log("Appointment details:", response.data.data);
        setSelectedAppointment(response.data.data.data);
        setDetailsModalOpen(true);
      } else {
        console.error("Error fetching appointment details");
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching appointment details:",
        error
      );
    }
  };
  const handleViewMorePending = async (id) => {
    await fetchAndDisplayAppointmentDetails(id);
    // onClose();
    console.log(`View more details for appointment with ID: ${id}`);
  };

  const handleEditAppointment = (id) => {
    setSelectedAppointmentId(id);
    setEditModalOpen(true);
    setDetailsModalOpen(false);
  };

  const handleCancelModalClose = () => {
    // Close the confirmation modal
    setConfirmationModalOpen(false);
  };


  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formattedDateTime = new Date(dateTimeString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDateTime;
  };

  const handleOpenDashboard = () => {
    navigate("/dashboard");
  };

  const handleCancelAppointment = (appointmentId) => {
    setCancellingAppointmentId(appointmentId);
    setConfirmationModalOpen(true);
  };

  const handleConfirmation = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `http://localhost:8080/v1/appointment/cancelAppointment/${cancellingAppointmentId}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(apiUrl, {}, { headers });

      if (response.data.success) {
        toast({
          title: response.data.message,
          status: "success",
          duration: 6000,
        });
        localStorage.removeItem("appointmentId");
        fetchData();
      } else {
        toast({
          title: "Error canceling appointment",
          description: response.data.message,
          status: "error",
          duration: 6000,
        });
        console.error("Error canceling appointment");
      }
    } catch (error) {
      console.error("An error occurred while canceling appointment:", error);
    } finally {
      setConfirmationModalOpen(false);
    }
  };

  const handleViewMore = async (id) => {
    await fetchAndDisplayAppointmentDetails(id);
    console.log(`View more details for appointment with ID: ${id}`);
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
            display="flex"
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
                  <Tab onClick={() => handleTabChange(0)}>All</Tab>
                  <Tab onClick={() => handleTabChange(1)}>Pending</Tab>
                  <Tab onClick={() => handleTabChange(2)}>Active</Tab>
                  <Tab onClick={() => handleTabChange(3)}>Completed</Tab>
                </TabList>
                <TabPanels marginLeft="-30px">
                  <TabPanel>
                    <Box
                      className="all-appointment"
                      overflow="scroll"
                      marginLeft="2%"
                      w="45vw"
                      h="28vh"
                    >
                      {loading ? (
                        <LoadingSpinner />
                      ) : appointments.length === 0 ? (
                        <Text marginLeft="35px">
                          You have no appointments yet. Click{" "}
                          <a
                            href="#"
                            style={{
                              color: "#A210C6",
                              fontStyle: "italic",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => handleTabChange(0)}
                          >
                            here
                          </a>{" "}
                          to book an appointment.
                        </Text>
                      ) : (
                        <VStack align="start" spacing={4}>
                          {loading ? (
                            <LoadingSpinner />
                          ) : appointments.length === 0 ? (
                            <Text marginLeft="35px">
                              You have no appointments yet. click{" "}
                              <a
                                href="#"
                                style={{
                                  color: "#A210C6",
                                  fontStyle: "italic",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                }}
                                onClick={handleOpenAppointmentModal}
                              >
                                book appointment
                              </a>{" "}
                              to begin.
                            </Text>
                          ) : (
                            <VStack align="start" spacing={4}>
                              {appointments.map((appointment) => (
                                <Box key={appointment.id}>
                                  <Flex>
                                    <Text fontWeight="bold" color="black">
                                      Care beneficiary:
                                    </Text>
                                    <Text marginLeft="5px" color="black">
                                      {`${appointment.recipientFirstname} ${appointment.recipientLastname}`}
                                    </Text>
                                  </Flex>
                                  <Flex>
                                    <Text fontWeight="bold" color="black">
                                      Booked on:
                                    </Text>
                                    <Text marginLeft="5px" color="black">
                                      {formatDateTime(appointment.createdAt)}
                                    </Text>
                                    <Text
                                      fontSize="16px"
                                      onClick={() =>
                                        handleViewMore(appointment.id)
                                      }
                                      style={{
                                        marginLeft: "60px",
                                        color: "#A210C6",
                                        fontStyle: "italic",
                                        cursor: "pointer",
                                      }}
                                      _hover={{ color: "#A210C6" }}
                                    >
                                      Details
                                    </Text>
                                    <Text
                                      fontSize="16px"
                                      marginLeft="60px"
                                      color={
                                        appointment.appointmentCompleted
                                          ? "green.500"
                                          : appointment.appointmentActive
                                          ? "blue.500"
                                          : appointment.appointmentMatched
                                          ? "yellow.500"
                                          : appointment.appointmentPending
                                          ? "yellow.500"
                                          : "black"
                                      }
                                      fontStyle="italic"
                                    >
                                      {appointment.appointmentCompleted
                                        ? "Completed"
                                        : appointment.appointmentActive
                                        ? "Active"
                                        : appointment.appointmentMatched
                                        ? "Paired"
                                        : appointment.appointmentPending
                                        ? "Pending"
                                        : "Unknown"}
                                    </Text>
                                  </Flex>
                                  <Divider my={4} borderColor="gray.500" />
                                </Box>
                              ))}
                            </VStack>
                          )}
                        </VStack>
                      )}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box
                      className="pending-appointment"
                      overflow="scroll"
                      marginLeft="2%"
                      w="45vw"
                      h="28vh"
                    >
                      {loading ? (
                        <LoadingSpinner />
                      ) : appointments.length === 0 ? (
                        <Text marginLeft="35px">
                          You have no appointments yet. Click{" "}
                          <a
                            href="#"
                            style={{
                              color: "#A210C6",
                              fontStyle: "italic",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => handleTabChange(0)}
                          >
                            here
                          </a>{" "}
                          to book an appointment.
                        </Text>
                      ) : (
                        <VStack align="start" spacing={4}>
                          {loading ? (
                            <LoadingSpinner />
                          ) : appointments.length === 0 ? (
                            <Text marginLeft="35px">
                              You have no appointments yet. click{" "}
                              <a
                                href="#"
                                style={{
                                  color: "#A210C6",
                                  fontStyle: "italic",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                }}
                                onClick={handleOpenAppointmentModal}
                              >
                                book appointment
                              </a>{" "}
                              to begin.
                            </Text>
                          ) : (
                            <VStack align="start" spacing={4}>
                              {appointments.map((appointment) => (
                                <Box key={appointment.id}>
                                  <Flex>
                                    <Text fontWeight="bold" color="black">
                                      Care beneficiary:
                                    </Text>
                                    <Text marginLeft="5px" color="black">
                                      {`${appointment.recipientFirstname} ${appointment.recipientLastname}`}
                                    </Text>
                                  </Flex>
                                  <Flex>
                                    <Text fontWeight="bold" color="black">
                                      Booked on:
                                    </Text>
                                    <Text marginLeft="5px" color="black">
                                      {formatDateTime(appointment.createdAt)}
                                    </Text>
                                    <Text
                                      fontSize="16px"
                                      onClick={() =>
                                        handleViewMore(appointment.id)
                                      }
                                      style={{
                                        marginLeft: "60px",
                                        color: "#A210C6",
                                        fontStyle: "italic",
                                        cursor: "pointer",
                                      }}
                                      _hover={{ color: "#A210C6" }}
                                    >
                                      Details
                                    </Text>
                                    <Text
                                      fontSize="16px"
                                      marginLeft="60px"
                                      color={
                                        appointment.appointmentCompleted
                                          ? "green.500"
                                          : appointment.appointmentActive
                                          ? "blue.500"
                                          : appointment.appointmentMatched
                                          ? "yellow.500"
                                          : appointment.appointmentPending
                                          ? "yellow.500"
                                          : "black"
                                      }
                                      fontStyle="italic"
                                    >
                                      {appointment.appointmentCompleted
                                        ? "Completed"
                                        : appointment.appointmentActive
                                        ? "Active"
                                        : appointment.appointmentMatched
                                        ? "Paired"
                                        : appointment.appointmentPending
                                        ? "Pending"
                                        : "Unknown"}
                                    </Text>
                                  </Flex>
                                  <Divider my={4} borderColor="gray.500" />
                                </Box>
                              ))}
                            </VStack>
                          )}
                        </VStack>
                      )}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box
                      className="active-appointment"
                      overflow="scroll"
                      marginLeft="2%"
                      w="45vw"
                      h="28vh"
                    >
                      {loading ? (
                        <LoadingSpinner />
                      ) : appointments.length === 0 ? (
                        <Text marginLeft="35px">
                          You have no appointments yet. Click{" "}
                          <a
                            href="#"
                            style={{
                              color: "#A210C6",
                              fontStyle: "italic",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => handleTabChange(0)}
                          >
                            here
                          </a>{" "}
                          to book an appointment.
                        </Text>
                      ) : (
                        <VStack align="start" spacing={4}>
                          {loading ? (
                            <LoadingSpinner />
                          ) : appointments.length === 0 ? (
                            <Text marginLeft="35px">
                              You have no appointments yet. click{" "}
                              <a
                                href="#"
                                style={{
                                  color: "#A210C6",
                                  fontStyle: "italic",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                }}
                                onClick={handleOpenAppointmentModal}
                              >
                                book appointment
                              </a>{" "}
                              to begin.
                            </Text>
                          ) : (
                            <VStack align="start" spacing={4}>
                              {appointments.map((appointment) => (
                                <Box key={appointment.id}>
                                  <Flex>
                                    <Text fontWeight="bold" color="black">
                                      Care beneficiary:
                                    </Text>
                                    <Text marginLeft="5px" color="black">
                                      {`${appointment.recipientFirstname} ${appointment.recipientLastname}`}
                                    </Text>
                                  </Flex>
                                  <Flex>
                                    <Text fontWeight="bold" color="black">
                                      Booked on:
                                    </Text>
                                    <Text marginLeft="5px" color="black">
                                      {formatDateTime(appointment.createdAt)}
                                    </Text>
                                    <Text
                                      fontSize="16px"
                                      onClick={() =>
                                        handleViewMore(appointment.id)
                                      }
                                      style={{
                                        marginLeft: "60px",
                                        color: "#A210C6",
                                        fontStyle: "italic",
                                        cursor: "pointer",
                                      }}
                                      _hover={{ color: "#A210C6" }}
                                    >
                                      Details
                                    </Text>
                                    <Text
                                      fontSize="16px"
                                      marginLeft="60px"
                                      color={
                                        appointment.appointmentCompleted
                                          ? "green.500"
                                          : appointment.appointmentActive
                                          ? "blue.500"
                                          : appointment.appointmentMatched
                                          ? "yellow.500"
                                          : appointment.appointmentPending
                                          ? "yellow.500"
                                          : "black"
                                      }
                                      fontStyle="italic"
                                    >
                                      {appointment.appointmentCompleted
                                        ? "Completed"
                                        : appointment.appointmentActive
                                        ? "Active"
                                        : appointment.appointmentMatched
                                        ? "Paired"
                                        : appointment.appointmentPending
                                        ? "Pending"
                                        : "Unknown"}
                                    </Text>
                                  </Flex>
                                  <Divider my={4} borderColor="gray.500" />
                                </Box>
                              ))}
                            </VStack>
                          )}
                        </VStack>
                      )}
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box
                      className="completed-appointment"
                      overflow="scroll"
                      marginLeft="2%"
                      w="45vw"
                      h="28vh"
                    >
                      {loading ? (
                        <LoadingSpinner />
                      ) : appointments.length === 0 ? (
                        <Text marginLeft="35px">
                          You have no appointments yet. Click{" "}
                          <a
                            href="#"
                            style={{
                              color: "#A210C6",
                              fontStyle: "italic",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => handleTabChange(0)}
                          >
                            here
                          </a>{" "}
                          to book an appointment.
                        </Text>
                      ) : (
                        <VStack align="start" spacing={4}>
                          {loading ? (
                            <LoadingSpinner />
                          ) : appointments.length === 0 ? (
                            <Text marginLeft="35px">
                              You have no appointments yet. click{" "}
                              <a
                                href="#"
                                style={{
                                  color: "#A210C6",
                                  fontStyle: "italic",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                }}
                                onClick={handleOpenAppointmentModal}
                              >
                                book appointment
                              </a>{" "}
                              to begin.
                            </Text>
                          ) : (
                            <VStack align="start" spacing={4}>
                              {appointments.map((appointment) => (
                                <Box key={appointment.id}>
                                  <Flex>
                                    <Text fontWeight="bold" color="black">
                                      Care beneficiary:
                                    </Text>
                                    <Text marginLeft="5px" color="black">
                                      {`${appointment.recipientFirstname} ${appointment.recipientLastname}`}
                                    </Text>
                                  </Flex>
                                  <Flex>
                                    <Text fontWeight="bold" color="black">
                                      Booked on:
                                    </Text>
                                    <Text marginLeft="5px" color="black">
                                      {formatDateTime(appointment.createdAt)}
                                    </Text>
                                    <Text
                                      fontSize="16px"
                                      onClick={() =>
                                        handleViewMore(appointment.id)
                                      }
                                      style={{
                                        marginLeft: "60px",
                                        color: "#A210C6",
                                        fontStyle: "italic",
                                        cursor: "pointer",
                                      }}
                                      _hover={{ color: "#A210C6" }}
                                    >
                                      Details
                                    </Text>
                                    <Text
                                      fontSize="16px"
                                      marginLeft="60px"
                                      color={
                                        appointment.appointmentCompleted
                                          ? "green.500"
                                          : appointment.appointmentActive
                                          ? "blue.500"
                                          : appointment.appointmentMatched
                                          ? "yellow.500"
                                          : appointment.appointmentPending
                                          ? "yellow.500"
                                          : "black"
                                      }
                                      fontStyle="italic"
                                    >
                                      {appointment.appointmentCompleted
                                        ? "Completed"
                                        : appointment.appointmentActive
                                        ? "Active"
                                        : appointment.appointmentMatched
                                        ? "Paired"
                                        : appointment.appointmentPending
                                        ? "Pending"
                                        : "Unknown"}
                                    </Text>
                                  </Flex>
                                  {/* <Divider my={4} borderColor="gray.500" /> */}
                                </Box>
                              ))}
                            </VStack>
                          )}
                        </VStack>
                      )}
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
          </Box>
          <Box marginLeft="900px" marginTop="-85px">
            <Image
              onClick={help}
              src={HelppIcon}
              alt="Logo"
              w="70px"
              h="70px"
              style={{
                cursor: "pointer",
                animation: "zoomInOut 2s infinite alternate",
              }}
            />

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

          <UserDetailsModal
            isOpen={showUserDetailsModal}
            onClose={handleCloseUserDetailsModal}
          />
          <BookAppointmentModal
            isOpen={showAppointmentModal}
            onClose={handleCloseAppointmentModal}
          />
          <CanceledAppointmentsModal
            isOpen={showCanceledModal}
            onClose={() => setShowCanceledModal(false)}
          />
          <SearchAppointmentsModal
            isOpen={showSearchAppointmentsModal}
            onClose={handleCloseSearchAppointmentsModal}
          />
          {detailsModalOpen && selectedAppointment && (
            <Modal
              isOpen={detailsModalOpen}
              onClose={() => setDetailsModalOpen(false)}
              size="4xl"
            >
              <ModalOverlay />
              <ModalContent overflowY="auto">
                <ModalHeader color="#A210C6">Appointment Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Progress size="xs" isIndeterminate />
                  <Flex marginTop="10px" marginLeft="80px">
                    <Flex>
                      <Box marginRight="20px">
                        <Flex>
                          <Text fontWeight="bold">Status</Text>
                          <Text
                            fontSize="16px"
                            marginLeft="20px"
                            color={
                              selectedAppointment.appointmentCompleted
                                ? "green.500"
                                : selectedAppointment.appointmentActive
                                ? "blue.500"
                                : selectedAppointment.appointmentMatched
                                ? "yellow.500"
                                : selectedAppointment.appointmentPending
                                ? "yellow.500"
                                : "black"
                            }
                          >
                            {selectedAppointment.appointmentCompleted
                              ? "Completed"
                              : selectedAppointment.appointmentActive
                              ? "Active"
                              : selectedAppointment.appointmentMatched
                              ? "Paired"
                              : selectedAppointment.appointmentPending
                              ? "Pending"
                              : "Unknown"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                        <Flex>
                          <Text fontWeight="bold" color="black">
                            Beneficiary name:
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {selectedAppointment.recipientFirstname &&
                            selectedAppointment.recipientLastname
                              ? `${selectedAppointment.recipientFirstname} ${selectedAppointment.recipientLastname}`
                              : "Not available"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Phone Number:
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {selectedAppointment.recipientPhoneNumber ||
                              "Not available"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Gender:
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {selectedAppointment.recipientGender ||
                              "Not available"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Date of Birth:
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {formatDate(selectedAppointment.recipientDOB) ||
                              "Not available"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Current Location:
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {selectedAppointment.currentLocation ||
                              "Not availabe"}
                          </Text>
                        </Flex>

                        <Divider my={4} borderColor="gray.500" />

                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Relationship:
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {selectedAppointment.relationship || "Nil"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                        <Flex marginTop="5px" marginBottom="10px">
                          <Text fontWeight="bold" color="black">
                            Booked on:
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {formatDateTime(selectedAppointment.createdAt)}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                      </Box>
                      <Box marginRight="20px">
                        <Flex>
                          <Text fontWeight="bold" color="black">
                            Shift:
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {selectedAppointment.shift || "Not availabe"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />

                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Service Plan
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {selectedAppointment.servicePlan || "Not availabe"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Type of caregiver
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {selectedAppointment.medicSpecialization ||
                              "Not availabe"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Cost of service
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {formattedCost(selectedAppointment.costOfService) ||
                              "Not availabe"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Start Date:
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {formatDate(selectedAppointment.startDate) ||
                              "Not availabe"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            End Date:
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {formatDate(selectedAppointment.endDate) ||
                              "Not availabe"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Medical Report:
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {selectedAppointment.medicalReport ||
                              "Not availabe"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Paid:
                          </Text>
                          <Text marginLeft="20px" color="black">
                            {selectedAppointment.paid ? "Yes" : "No"}
                          </Text>
                        </Flex>
                        <Divider my={4} borderColor="gray.500" />
                      </Box>
                    </Flex>
                  </Flex>
                  <Box>
                    <Flex marginTop="5px">
                      <Text marginLeft="80px" fontWeight="bold" color="black">
                        Health History:
                      </Text>
                      <Text
                        marginLeft="10px"
                        color="black"
                        maxW="600px"
                        maxH="1000px"
                      >
                        {selectedAppointment.recipientHealthHistory ||
                          "Not available"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </VStack>
      </Flex>
      
      {confirmationModalOpen && (
        <Modal
          isOpen={confirmationModalOpen}
          onClose={handleCancelModalClose}
          size="md"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to cancel this appointment? <br></br>
              This action is irreversible.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={handleCancelModalClose}>
                No
              </Button>
              <Button marginLeft="5px" onClick={handleConfirmation}>
                Yes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </ChakraProvider>
  );
};

export default AppointmentPage;
