import React, { useState, useEffect } from "react";
import { GetCurrentUser } from "../../apiCalls/UserApis";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../redux/userSlice";
import BookAppointmentModal from "../sections/BookAppointment";
import MatchedAppointmentsModal from "../sections/MatchedAppointmentsModal";
import PayForAppointmentModal from "../sections/PayForAppointment";
import Help from "../layouts/Help";
import {
  Box,
  Button,
  Flex,
  VStack,
  Image,
  extendTheme,
  ChakraProvider,
  Text,
  useToast,
  Skeleton,
  Grid, 
  GridItem,
} from "@chakra-ui/react";
import AOS from "aos";
import "../../styles/pages/LandingPage.css";
import BeneficiariesModal from "../sections/Beneficiaries";
import ServicesModal from "../sections/ServicePageModal";
import LoadingSpinner from "../../utils/Spiner";
import NavBar from "../layouts/NavBar";
import SideBar from "../layouts/SideBar";

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

const ClientDash = () => {
  const [loading, setLoading] = useState(false);
  const [isBeneficiariesModalOpen, setBeneficiariesModalOpen] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const balance = 0.0;
  const pendingAppointments = user?.numberOfPendingAppointments;
  const activeAppointments = user?.numberOfActiveAppointments;
  const completedAppointments = user?.numberOfCompletedAppointments;
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [apiMessage, setApiMessage] = useState("");
  const [showPayAppointmentModal, setShowPayAppointmentModal] = useState(false);

  const [matchedAppointments, setMatchedAppointments] = useState([]);
  const [showMatchedAppointmentsModal, setShowMatchedAppointmentsModal] =
    useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    // Call the function after 5 seconds
    const timeoutId = setTimeout(checkPendingAppointment, 5000);

    // Clear timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  const checkPendingAppointment = () => {
    const appointmentId = localStorage.getItem("appointmentId");
    if (appointmentId && user && user.appointmentPaid === false) {
      // Display modal with the message
      setShowPayAppointmentModal(true);
    }
  };

  useEffect(() => {
    const fetchMatchedAppointments = async () => {
      try {
        const appointmentId = localStorage.getItem("appointmentId");
        if (appointmentId) {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `http://localhost:8080/v1/appointment/match-appointment/${appointmentId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            console.log("Response from matched appointments:", data);
            setMatchedAppointments(data.data);
            console.log("Response from api message", data.message);

            // Check if data.data exists and is an array with length > 0
            if (data.data && Array.isArray(data.data) && data.data.length > 0) {
              setShowMatchedAppointmentsModal(true);
            } else {
              console.log("No matched appointments found in data.");
            }
          } else {
            console.error("Failed to fetch matched appointments:", data.error);
          }
        } else {
          console.log("No appointment ID found in local storage.");
        }
      } catch (error) {
        console.error("Error fetching matched appointments:", error);
      }
    };

    // Fetch matched appointments initially
    setTimeout(fetchMatchedAppointments, 5000);

    const intervalId = setInterval(fetchMatchedAppointments, 15 * 60 * 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleOpenAppointmentModal = () => {
    setShowAppointmentModal(true);
  };

  const handleCloseAppointmentModal = () => {
    setShowAppointmentModal(false);
  };

  const handleBeneficiariesButtonClick = () => {
    setBeneficiariesModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (localStorage.getItem("token")) {
        try {
          console.log("Calling GetCurrentUser API");
          const response = await GetCurrentUser();

          if (response.success) {
            console.log("API response:", response.data);
            dispatch(SetUser(response.data));
          } else {
            console.error("API request failed:", response.error);
          }
        } catch (error) {
          console.error("Error in GetCurrentUser API:", error);
        } finally {
          setLoading(false);
          setShowSkeleton(false);
        }
      } else {
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  const handleOpenWalletModal = () => {
    navigate("/wallet");
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Flex overflowY="scroll" height="100vh" w="100vw">
        <SideBar />

        <VStack w="75%" h="100vh">
          <NavBar />
          <Flex>
            <Box>
              <Box
                marginTop="50px"
                bg="#A210C6"
                w="50vw"
                h="25vh"
                borderRadius="20px"
                marginBottom="30px"
              >
                {" "}
                <Flex>
                  <VStack marginLeft="10px" paddingTop="5px">
                    <Text
                      fontSize="14px"
                      fontFamily="body"
                      color="white"
                      marginTop="20px"
                    >
                      Mikul Health Savings Account
                    </Text>
                    <Text color="white" fontSize="12px" marginLeft="-80%">
                      ₦{balance.toFixed(2)}
                    </Text>
                  </VStack>
                  <VStack>
                    <Button
                      borderRadius="15px"
                      color="#A210C6"
                      marginLeft="300px"
                      marginTop="20px"
                      onClick={handleOpenWalletModal}
                      bg="white"
                    >
                      Open wallet
                    </Button>
                  </VStack>
                </Flex>
                <Flex marginLeft="10px" marginTop="30px">
                  <VStack color="white">
                    <Text marginLeft="-130px" fontSize="12px">
                      Wallet ID:
                    </Text>
                    <Text fontSize="16px">Wema Bank 0124536789</Text>
                  </VStack>
                  <Flex marginLeft="250px">
                    <VStack color="white">
                      <Text fontSize="14px">Total funded</Text>
                      <Text color="white" fontSize="12px" marginLeft="-44px">
                        ₦{balance.toFixed(2)}
                      </Text>
                    </VStack>
                    <VStack color="white" marginLeft="50px">
                      <Text fontSize="14px">Total spent</Text>
                      <Text color="white" fontSize="12px" marginLeft="-34px">
                        ₦{balance.toFixed(2)}
                      </Text>
                    </VStack>
                  </Flex>
                </Flex>
              </Box>

              <Box marginTop="-5px">
                <Flex>
                  <Box
                    style={{
                      // boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    bg="#ECCFF4"
                    w="24.5vw"
                    h="20vh"
                    borderRadius="10px"
                    _hover={{
                      transform: "translateY(-10px)",
                    }}
                  >
                    <VStack marginTop="10px">
                      <Text
                        marginLeft="-160px"
                        fontSize="20px"
                        fontFamily="heading"
                        color="black"
                      >
                        Book Appointment
                      </Text>
                      <Text marginLeft="-120px" fontSize="16px">
                        Schedule your appointment
                      </Text>
                    </VStack>
                    <Text
                      fontSize="16px"
                      style={{
                        marginLeft: "130px",
                        marginTop: "30px",
                        fontStyle: "italic",
                        cursor: "pointer",
                      }}
                      color="#A210C6"
                      onClick={handleOpenAppointmentModal}
                      _hover={{ color: "#A210C6" }}
                    >
                      Book now
                    </Text>
                  </Box>
                  <Box
                    style={{
                      // boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    _hover={{
                      transform: "translateY(-10px)",
                    }}
                    bg="#ECCFF4"
                    w="24.5vw"
                    h="20vh"
                    marginLeft="10px"
                    borderRadius="10px"
                    onClick={handleBeneficiariesButtonClick}
                  >
                    <VStack marginTop="10px">
                      <Text
                        marginLeft="-205px"
                        fontSize="20px"
                        fontFamily="heading"
                        color="black"
                      >
                        Beneficiaries
                      </Text>
                      <Text marginLeft="-110px" fontSize="16px">
                        Your friends and loved ones
                      </Text>
                    </VStack>
                    <Text
                      fontSize="16px"
                      style={{
                        marginLeft: "130px",
                        marginTop: "30px",
                        fontStyle: "italic",
                        cursor: "pointer",
                      }}
                      color="#A210C6"
                      _hover={{ color: "#A210C6" }}
                    >
                      view all
                    </Text>
                  </Box>
                </Flex>
                <Flex marginTop="25px">
                  <Box
                    style={{
                      // boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    _hover={{
                      transform: "translateY(-10px)",
                    }}
                    bg="#ECCFF4"
                    w="24.5vw"
                    h="20vh"
                    borderRadius="10px"
                  >
                    <VStack marginTop="10px">
                      <Text
                        fontSize="20px"
                        fontFamily="heading"
                        color="black"
                        marginLeft="-205px"
                      >
                        Our services
                      </Text>
                      <Text fontSize="16px" marginLeft="-85px">
                        Explore a variety of our services
                      </Text>
                    </VStack>
                    <NavLink to="/services">
                      <Text
                        fontSize="16px"
                        style={{
                          marginLeft: "130px",
                          marginTop: "30px",
                          fontStyle: "italic",
                          cursor: "pointer",
                        }}
                        color="#A210C6"
                        _hover={{ color: "#A210C6" }}
                      >
                        View services
                      </Text>
                    </NavLink>
                  </Box>
                  <Box
                    style={{
                      // boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    _hover={{
                      transform: "translateY(-10px)",
                    }}
                    bg="#ECCFF4"
                    w="24.5vw"
                    h="20vh"
                    marginLeft="10px"
                    borderRadius="10px"
                  >
                    <VStack marginTop="10px">
                      <Text
                        fontSize="20px"
                        fontFamily="heading"
                        color="black"
                        marginLeft="-185px"
                      >
                        Medical Report
                      </Text>
                      <Text marginLeft="-100px" fontSize="16px">
                        Access and view your reports
                      </Text>
                    </VStack>
                    <Text
                      fontSize="16px"
                      style={{
                        marginLeft: "130px",
                        marginTop: "30px",
                        fontStyle: "italic",
                        cursor: "pointer",
                      }}
                      color="#A210C6"
                      _hover={{ color: "#A210C6" }}
                    >
                      View reports
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>

            <Box marginLeft="30px">
              <Box
                marginTop="50px"
                color="white"
                borderRadius="10px"
                h="40vh"
                w="20vw"
                bg="#A210C6"
              >
                <VStack>
                  <Text
                    fontSize="20px"
                    fontFamily="body"
                    marginTop="20px"
                    marginLeft="-15px"
                  >
                    My Appointments
                  </Text>
                  <Flex
                    flexDirection="column"
                   
                    marginTop="7px"
                  >
                    <Text
                      style={{
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                      _hover={{ color: "" }}
                    >
                      Pending: {pendingAppointments}
                    </Text>
                    <Text
                      marginTop="5px"
                      marginLeft=""
                      style={{
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                      _hover={{ color: "" }}
                    >
                      Active: {activeAppointments}
                    </Text>
                    <Text
                      marginTop="5px"
                      style={{
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                      _hover={{ color: "" }}
                    >
                      Completed: {completedAppointments}
                    </Text>
                  </Flex>
                </VStack>
              </Box>

              {/* <Box marginTop="-28px" bg="#F6E4FC" borderRadius="10" h="30vh">
                  <Text
                    fontSize="20px"
                    fontFamily="body"
                    color="black"
                    marginTop="40px"
                    marginLeft="-75px"
                  >
                    Article title
                  </Text>
                  <Text
                    style={{
                      fontStyle: "italic",
                    }}
                  >
                    Lorem Ipsum Dolor Sit Amet{" "}
                  </Text>

                  <Image
                    src={familyIcon}
                    alt="Nurse and Patient"
                    w="150px"
                    h="150px"
                    marginLeft="70px"
                    marginTop="20px"
                  />
                  <Text
                    fontSize="18px"
                    style={{
                      marginLeft: "125px",
                      marginTop: "15px",
                      fontStyle: "italic",
                      cursor: "pointer",
                      color: "#A210C6",
                    }}
                    _hover={{ color: "#A210C6" }}
                  >
                    Read more
                  </Text>
                </Box> */}
              <Help />
            </Box>
          </Flex>
        </VStack>
      </Flex>
      <BeneficiariesModal
        isOpen={isBeneficiariesModalOpen}
        onClose={() => setBeneficiariesModalOpen(false)}
      />

      <BookAppointmentModal
        isOpen={showAppointmentModal}
        onClose={handleCloseAppointmentModal}
      />
      <MatchedAppointmentsModal
        isOpen={showMatchedAppointmentsModal}
        onClose={() => setShowMatchedAppointmentsModal(false)}
        matchedAppointments={matchedAppointments}
        apiResponseMessage={apiMessage}
      />

      <PayForAppointmentModal
        isOpen={showPayAppointmentModal}
        onClose={() => setShowPayAppointmentModal(false)}
      />
    </ChakraProvider>
  );
};

export default ClientDash;
