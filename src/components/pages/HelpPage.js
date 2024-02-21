import React, { useState, useEffect } from "react";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../../redux/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RightArrow from "../../assets/RightArrow.svg";
import Help from "../../assets/Help.svg";
import WhatsAppIcon from "../../assets/WhatsApp.svg";
import SideBar from "../layouts/SideBar";
import NavBar from "../layouts/NavBar";
import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  VStack,
  Input,
  Button,
  useToast,
  Image,
  Box,
  Text,
  Flex,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  FormControl,
  FormLabel,
  extendTheme,
} from "@chakra-ui/react";
import userImageIcon from "../../assets/userImage.svg";
import NotificationIcon from "../../assets/notification.svg";
import familyIcon from "../../assets/family.svg";
import UserDetailsModal from "../sections/UserDetails";
import LoadingSpinner from "../../utils/Spiner";
import Wallet from "../../assets/Wallet.svg";
import logo from "../../assets/LogoColoured.svg";
import SettingsIcon from "../../assets/SettingsIcon.svg";
import LogoutIcon from "../../assets/Logout.svg";
import AppointmentsIcon from "../../assets/AppointmentIcon.svg";
import HomeIcon from "../../assets/HomeBlack.svg";
import LogoutModal from "../sections/LogoutModal";
import serviceIcon from "../../assets/ServiceIcon.svg";
import SearchAppointmentsModal from "../sections/SearchAppointmentByDate";

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

const HelpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleOpenHelpModal = () => {};

  const handleOpenWalletModal = () => {
    navigate("/wallet");
  };

  const handleOpenSettingsModal = () => {
    navigate("/settings");
  };

  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    // Close the logout confirmation modal
    setShowLogoutModal(false);

    // Perform the actual logout
    localStorage.removeItem("token");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("orderId");
    navigate("/");
  };

  const handleOpenDashboard = () => {
    navigate("/dashboard");
  };

  const handleOpenAppointmentsModal = () => {
    navigate("/appointment");
  };

  const Services = () => {
    navigate("/services");
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Flex overflow="hidden" height="100vh" w="100vw">
        <SideBar />
        <Box w="75%" h="100vh">
          <NavBar />

          <Flex>
            <Box>
              <Box marginLeft="540px">
                <Text
                  fontFamily="body"
                  marginLeft="-745px"
                  color="#A210C6"
                  fontSize="24px"
                >
                  Frequently Asked Questions
                </Text>
                <Text fontStyle="italic" fontSize="16px" marginLeft="-763px">
                  Click on a question to see more details
                </Text>
              </Box>
              <Box>
                <Accordion
                  allowToggle
                  w="520px"
                  data-aos="fade-down"
                  data-aos-duration="10000"
                >
                  <AccordionItem
                    p={-8}
                    my={5}
                    fontSize="24px"
                    className="custom-accordion-item"
                  >
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize="21px"
                        >
                          How do I add my loved ones as beneficiaries?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel className="custom-accordion-panel">
                      Upon a successful registeration, you can request and get
                      matched to a medic to recieve care by booking any of the
                      services we offer from your dashboard.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem
                    p={-8}
                    my={5}
                    fontSize="24px"
                    className="custom-accordion-item"
                  >
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize="21px"
                        >
                          I entered the wrong details while booking my
                          appointment. How do I change it?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      className="custom-accordion-panel"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      To ensure you are safe while you receive care from any
                      Mikul&nbsp;Health care provider, we make sure our
                      caregivers are vetted and their background checked. We
                      also have an insurance policy for any theft and damages
                      during the course of our service.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem
                    p={-8}
                    my={5}
                    fontSize="24px"
                    className="custom-accordion-item"
                  >
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize="21px"
                        >
                          I would like to book multiple services at the same
                          time. How do I do that?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel className="custom-accordion-panel">
                      Yes you can have a replacement when asigned a caregiver
                      that you do not like. We can provide a replace within 72
                      hours upon your request for a replacement.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem
                    p={-8}
                    my={5}
                    fontSize="24px"
                    className="custom-accordion-item"
                  >
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize="21px"
                        >
                          I am no longer interested in using this service. How
                          can I cancel?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel className="custom-accordion-panel">
                      Yes, aside our standadized service plans. We also have
                      provision for customizing a service plan that would best
                      suit you or your loved according to the peculiarity of the
                      care needs.
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </Box>
            <Box marginTop="80px">
              <Box>
                <Text marginLeft="-190px" color="#A210C6" fontSize="24px">
                  Contact us
                </Text>
                <Text>If you have any issues, our Mikul Customer</Text>
                <Text marginLeft="-33px">
                  Care agents are always happy to help.
                </Text>
                <Text marginTop="50px" marginLeft="-145px">
                  You can reach us via:
                </Text>
                <Text marginLeft="-68px">
                  Email:{" "}
                  <a
                    href="mailto:support@mikulhealth.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    support@mikulhealth.com
                  </a>
                </Text>
                <Text marginLeft="-120px">
                  Phone: <a href="tel:+2349160596636">+2349160596636</a>
                </Text>
              </Box>

              <Box marginLeft="350px" marginTop="50px">
                <a href="https://wa.me/2347032579006">
                  <Image
                    // onClick={help}
                    src={WhatsAppIcon}
                    alt="Logo"
                    w="70px"
                    h="70px"
                    style={{
                      cursor: "pointer",
                      animation: "zoomInOut 2s infinite alternate",
                    }}
                  />
                </a>
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
            </Box>
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};
export default HelpPage;
