import React, { useState, useEffect } from "react";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../../redux/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CanceledAppointmentsModal from "../sections/CanceledAppointments";
import Help from "../../assets/Help.svg";
import HelppIcon from "../../assets/HelppIcon.svg";
import LogoutModal from "../sections/LogoutModal";
import serviceIcon from "../../assets/ServiceIcon.svg";
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
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  extendTheme,
  ModalBody,
  Divider,
  ModalCloseButton,
} from "@chakra-ui/react";
import userImageIcon from "../../assets/userImage.svg";
import NotificationIcon from "../../assets/notification.svg";
import UserDetailsModal from "../sections/UserDetails";
import logo from "../../assets/LogoColoured.svg";
import SettingsIcon from "../../assets/SettingsIcon.svg";
import LogoutIcon from "../../assets/Logout.svg";
import AppointmentsIcon from "../../assets/AppointmentIcon.svg";
import HomeIcon from "../../assets/HomeBlack.svg";
import Transfer from "../../assets/TransferPayment.svg";
import Online from "../../assets/OnlinePayment.svg";
import RightArrow from "../../assets/RightArrow.svg";
import Wallet from "../../assets/WalletWhite.svg";
import LoadingSpinner from "../../utils/Spiner";
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

const FundWalletModal = ({
  isOpen,
  onClose,
  onBankTransfer,
  onOnlinePayment,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" borderRadius="15px">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader marginLeft="200px">Fund Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            marginLeft="8px"
            border="1px solid black"
            h="12vh"
            w="37vw"
            borderRadius="15px"
            paddingBottom="5px"
            onClick={onBankTransfer}
            style={{
              cursor: "pointer",
            }}
            _hover={{ color: "#A210C6" }}
          >
            <Flex>
              <Image
                marginLeft="15px"
                marginTop="15px"
                w="50px"
                h="50px"
                src={Transfer}
                alt="Settings"
              />
              <Box marginLeft="10px" padding="10px" paddingBottom="10px">
                <Text>Via Bank Transfer</Text>
                <Text>Direct bank transfer to your Mikul wallet account</Text>
              </Box>
              <Image
                marginLeft="15px"
                marginTop="25px"
                w="30px"
                h="30px"
                src={RightArrow}
                alt="Settings"
              />
            </Flex>
          </Box>
          <Box
            marginTop="15px"
            marginLeft="8px"
            border="1px solid black"
            h="12vh"
            w="37vw"
            marginBottom="15px"
            borderRadius="15px"
            onClick={onOnlinePayment}
            style={{
              cursor: "pointer",
            }}
            _hover={{ color: "#A210C6" }}
          >
            <Flex>
              <Image
                marginLeft="15px"
                marginTop="15px"
                w="50px"
                h="50px"
                src={Online}
                alt="Settings"
              />
              <Box marginLeft="10px" padding="10px" paddingBottom="10px">
                <Text>Online Payment</Text>
                <Text>Fund your Mikul wallet with a debit card</Text>
              </Box>
              <Image
                marginLeft="70px"
                marginTop="25px"
                w="30px"
                h="30px"
                src={RightArrow}
                alt="Settings"
                style={{
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
              />
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const BankTransferModal = ({ isOpen, onClose, bankDetails }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader marginLeft="130px">Bank Transfer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text marginTop="-10px">
            This is your Mikul Health account number. Please refresh this page
            after making a transfer to this account number either via your bank
            app or bank USSD code
          </Text>
          <Flex
            borderRadius="15px"
            border="1px solid black"
            marginLeft="10px"
            padding="10px"
            marginTop="10px"
          >
            <Text>Bank Name:</Text>
            <Text marginLeft="200"> {bankDetails.bankName}</Text>
          </Flex>
          <Flex
            borderRadius="15px"
            border="1px solid black"
            marginLeft="10px"
            padding="10px"
            marginTop="20px"
          >
            <Text>Account Name:</Text>
            <Text marginLeft="140"> {bankDetails.accountName}</Text>
          </Flex>
          <Flex
            borderRadius="15px"
            border="1px solid black"
            marginLeft="10px"
            padding="10px"
            marginTop="20px"
            marginBottom="20px"
          >
            <Text>Account Number:</Text>
            <Text marginLeft="145"> {bankDetails.accountNumber}</Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const OnlinePaymentModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");

  const handleAmountSubmission = () => {
    // Handle the submission of the entered amount here
    console.log("Amount submitted:", amount);
    // You can perform further actions like making a deposit or calling an API here
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader marginLeft="130px">Online Payment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Input amount:</FormLabel>
            <Input
              type="number"
              value={amount}
              border="1px solid black"
              placeholder="₦5000"
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormControl>
          <Button
            marginTop="10px"
            marginBottom="20px"
            marginLeft="130px"
            bg="#A210C6"
            color="white"
            onClick={handleAmountSubmission}
            _hover={{ backgroundColor: "blue.500" }}
          >
            Make deposit
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const WalletPage = () => {
  const [showFundWalletModal, setShowFundWalletModal] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [showOnlinePaymentModal, setShowOnlinePaymentModal] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const balance = 0.0;
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleOpenFundWalletModal = () => {
    setShowFundWalletModal(true);
  };

  const handleCloseFundWalletModal = () => {
    setShowFundWalletModal(false);
  };

  const handleOpenBankTransferModal = () => {
    setShowBankTransferModal(true);
  };

  const handleCloseBankTransferModal = () => {
    setShowBankTransferModal(false);
  };

  const handleOpenOnlinePaymentModal = () => {
    setShowOnlinePaymentModal(true);
  };

  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    localStorage.removeItem("token");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("orderId");
    navigate("/");
  };

  const handleOpenDashboard = () => {
    navigate("/dashboard");
  };
  const handleOpenSettingsModal = () => {
    navigate("/settings");
  };

  const handleOpenAppointmentsModal = () => {
    navigate("/appointment");
  };

  const help = () => {
    navigate("/help");
  };

  const Services = () => {
    navigate("/services");
  };

  const openCreditpage = () => {
    navigate("/credit");
  };
  const openDebitpage = () => {
    navigate("/debit");
  };

  const handleCloseOnlinePaymentModal = () => {
    setShowOnlinePaymentModal(false);
  };

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Flex>
        <SideBar />
        <VStack w="75%" h="100vh">
          <NavBar />
          <Box>
            <Box
              marginTop="30px"
              border="1px solid gray"
              borderRadius="md"
              padding="3px"
              w="70vw"
              h="6vh"
            >
              <Flex marginLeft="10px" marginTop="5px">
                <SearchIcon boxSize={4} marginRight="10px" marginTop="5px" />
                <Text
                  fontSize="16px"
                  fontFamily="body"
                  style={{
                    marginLeft: "5px",
                    marginTop: "1px",
                    fontStyle: "italic",
                    cursor: "pointer",
                  }}
                  _hover={{ color: "#A210C6" }}
                  // onClick={handleOpenSearchAppointmentsModal}
                >
                  Search transaction by date
                </Text>
              </Flex>
            </Box>
            <Box
              marginTop="10px"
              bg="#A210C6"
              w="70vw"
              h="25vh"
              borderRadius="20px"
              display="flex"
            >
              <VStack>
                <Flex marginTop="15px" marginLeft="30">
                  <VStack color="white">
                    <Text fontSize="16px" fontFamily="body">
                      Mikul health wallet
                    </Text>
                    <Text marginLeft="-58px" fontSize="24px">
                      ₦ {balance.toFixed(2)}
                    </Text>
                  </VStack>

                  <Button
                    borderRadius="15px"
                    color="#A210C6"
                    marginLeft="650px"
                    onClick={handleOpenFundWalletModal}
                    bg="white"
                    _hover={{ color: "" }}
                  >
                    Fund wallet
                  </Button>
                </Flex>
                <Flex marginLeft="15px" marginTop="10px">
                  <VStack color="white">
                    <Text marginLeft="-110px" fontSize="16px">
                      Wallet ID:
                    </Text>
                    <Text  fontFamily="body" fontSize="16px">
                      Wema Bank 0124536789
                    </Text>
                  </VStack>
                  <Flex marginLeft="480px">
                    <VStack w="8vw" color="white">
                      <Text fontSize="14px">Total funded</Text>
                      <Text marginLeft="-20px" color="white" fontSize="12px">
                        ₦{balance.toFixed(2)}
                      </Text>
                    </VStack>
                    <VStack w="8vw" color="white" marginLeft="10px">
                      <Text fontSize="14px">Total spent</Text>
                      <Text marginLeft="-20px" color="white" fontSize="12px">
                        ₦{balance.toFixed(2)}
                      </Text>
                    </VStack>
                  </Flex>
                </Flex>
              </VStack>
            </Box>

            <Box>
              <VStack>
              <Text
                fontSize="28px"
                fontFamily="heading"
                color="black"
                marginLeft="-780px"
                marginTop="20px"
              >
                Recent activity
              </Text>
              </VStack>
              
              <Flex marginTop="10px">
                <Text
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    textDecorationThickness: "5px",
                  }}
                  _hover={{ color: "#A210C6" }}
                  marginLeft="15px"
                >
                  All
                </Text>{" "}
                <Text
                  style={{
                    cursor: "pointer",
                  }}
                  _hover={{ color: "#A210C6" }}
                  marginLeft="50px"
                  onClick={openCreditpage}
                >
                  Credit
                </Text>{" "}
                <Text
                  style={{
                    cursor: "pointer",
                  }}
                  _hover={{ color: "#A210C6" }}
                  marginLeft="50px"
                  onClick={openDebitpage}
                >
                  Debit
                </Text>
              </Flex>
              <Divider
                marginTop="-10%"
                marginLeft="2%"
                my={4}
                borderColor="gray.500"
                width="60%"
              />
            </Box>
            <Box marginLeft="900px" marginTop="120px">
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
          </Box>
        </VStack>

        <UserDetailsModal
          isOpen={showUserDetailsModal}
          onClose={handleCloseUserDetailsModal}
        />
        <FundWalletModal
          isOpen={showFundWalletModal}
          onClose={handleCloseFundWalletModal}
          onBankTransfer={handleOpenBankTransferModal}
          onOnlinePayment={handleOpenOnlinePaymentModal}
        />
        <BankTransferModal
          isOpen={showBankTransferModal}
          onClose={handleCloseBankTransferModal}
          bankDetails={{
            bankName: "XYZ Bank",
            accountName: "Michael Joshua",
            accountNumber: "0123456789",
          }}
        />
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleConfirmLogout}
        />
        <OnlinePaymentModal
          isOpen={showOnlinePaymentModal}
          onClose={handleCloseOnlinePaymentModal}
        />
      </Flex>
    </ChakraProvider>
  );
};

export default WalletPage;
