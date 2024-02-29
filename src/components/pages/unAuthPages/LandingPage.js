import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useRoutes, Outlet } from "react-router-dom";
import {
  useDisclosure,
  Box,
  Input,
  Button,
  Link as ChakraLink,
  HStack,
  Spacer,
  Image,
  extendTheme,
  ChakraProvider,
  Text,
  Divider,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import "animate.css";
import MHNurse from "../../../assets/MHNurse.svg";
import SignUp from "../../../assets/SignUp.svg";
import SelectCare from "../../../assets/SelectService.svg";
import GetMatched from "../../../assets/GetMatched.svg";
import ReceieveCare from "../../../assets/RecieveCare.svg";
import CenterMed from "../../../assets/CenterMedic.svg";
import Kudirat from "../../../assets/Kudirat.svg";
import Joy from "../../../assets/Josy.svg";
import Adeola from "../../../assets/Adeola.svg";
import Gift from "../../../assets/Gift.svg";
import "../../../styles/pages/LandingPage.css";
import GetStartedModal from "../../unAuthLayouts/GetStarted";
import AOS from "aos";
import "aos/dist/aos.css";
import NavigationBar from "../../unAuthLayouts/NavigationBar";
import Footer from "../../unAuthLayouts/Footer";
import Services from "../../unAuthLayouts/ServicesSection";
import Faqs from "../../unAuthLayouts/Faqs";

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
    body: "Gill Sans MT, sans-serif",
    heading: "Gill Sans MT, sans-serif",
  },
});

const LandingPage = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const handleSwitchToggle = () => {
    setIsSwitchOn((prev) => !prev);
  };
  const handleMouseOver = () => {
    // Open the modal when the user hovers over the button
    onOpen();
  };

  const handleMouseOut = () => {
    // Close the modal when the user moves the cursor away from the button
    onClose();
  };
  const settingsContainerStyle = {
    animation: "slideInUp 0.9s ease-in-out",
  };
  return (
    <ChakraProvider theme={customTheme}>
      <NavigationBar />
      <Box
        style={settingsContainerStyle}
        marginBottom="100px"
        marginTop="50px"
        display="flex"
      >
        <HStack spacing={8} alignItems="center">
          <Box w="25px" />
          <Box>
            <Text
              textAlign="left"
              fontSize="48px"
              fontWeight="bold"
              fontFamily="body"
            >
              <span style={{ color: "#A210C6" }}>Healthcare</span> that you{" "}
            </Text>
            <Text
              marginTop="-10px"
              textAlign="left"
              fontSize="48px"
              fontWeight="bold"
              fontFamily="body"
            >
              deserve at your fingertips
            </Text>
            <Text
              marginTop="10px"
              textAlign="left"
              fontWeight="bold"
              fontFamily="body"
              fontSize="20px"
              color="#A210C6"
            >
              We source carefully trained medics to help <br />
              you and your loved ones on their health
              <br />
              journey.
            </Text>

            <Button
              marginTop="15px"
              bg="#A210C6"
              color="white"
              borderRadius="100px"
              marginLeft="-450px"
              //  onMouseOver={handleMouseOver}
              //  onMouseOut={handleMouseOut}
              onClick={onOpen}
            >
              Get started
            </Button>
          </Box>
        </HStack>
        <Spacer />

        <style>
          {`
          @keyframes zoomInOut {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
        </style>
        <Box
          marginLeft="50px"
          className="box"
          data-aos="zoom-out"
          data-aos-duration="10000"
          h="500px"
          w="520px"
          animation="zoomInOut 8s infinite"
          overflow="hidden"
        >
          <Image
            // borderRadius="100px"
            src={MHNurse}
            alt="Logo"
            style={{ width: "500px", height: "520px" }}
          />
        </Box>
      </Box>
      <Services />
      <Divider />
      <Box bg="white">
        <Box h="60px" />
        <Box>
          <Text
            fontSize="48px"
            fontWeight="bold"
            fontFamily="body"
            color="black"
          >
            How it works
          </Text>
          <Box h="5" />
        </Box>
        <Box h="20px" />
        <Box display="flex">
          <Box w="70px" />
          <Box
            bg="white"
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
            data-aos="flip-left"
            data-aos-duration="30000"
          >
            <Box marginLeft="20px">
              <Image src={SignUp} alt="Logo" w="200px" h="200px" />
            </Box>
            <Box h="5" />
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Sign up
            </Text>
            <Text textAlign="center">
              Getting started is quick <br />
              and easy. Sign up with <br />
              us to receive premium <br />
              care
            </Text>
          </Box>
          <Box w="10" />
          <Box
            bg="white"
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
            data-aos="flip-left"
            data-aos-duration="30000"
          >
            <Box marginLeft="20px">
              <Image src={SelectCare} alt="Logo" w="200px" h="200px" />
            </Box>
            <Box h="5" />
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Select Care
            </Text>
            <Text textAlign="center">
              Now that you are a part <br />
              of our community, you <br />
              can find the kind of <br />
              service you need
            </Text>
          </Box>
          <Box w="10" />
          <Box
            bg="white"
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
            data-aos="flip-right"
            data-aos-duration="30000"
          >
            <Box marginLeft="15px">
              <Image src={GetMatched} alt="Logo" w="200px" h="200px" />
            </Box>
            <Box h="5" />
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Get Matched
            </Text>
            <Text textAlign="center">
              Personalized care, just a <br />
              click away. We match <br />
              you to a professional <br />
              tailored to your needs
            </Text>
          </Box>
          <Box w="10" />
          <Box
            bg="white"
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
            data-aos="flip-right"
            data-aos-duration="30000"
          >
            <Box marginLeft="15px">
              <Image src={ReceieveCare} alt="Logo" w="200px" h="200px" />
            </Box>
            <Box h="5" />
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Receive Care
            </Text>
            <Text textAlign="center">
              Getting started is quick <br />
              and easy. Sign up with <br />
              us to receive premium <br />
              care
            </Text>
          </Box>
        </Box>
        <Box h="60px" />
      </Box>
      <Faqs />
      <Box bg="white">
        <Divider />
        <Box h="60px" />
        <Box>
          <Text
            fontSize="48px"
            fontWeight="bold"
            fontFamily="Montserrat"
            color="black"
          >
            Testimonials
          </Text>
          <Text fontSize="24px" fontFamily="body" color="black">
            Here is what our clients have to say about us
          </Text>
          <Box h="5" />
        </Box>
        <Box h="20px" />
        <Box display="flex" marginLeft="100px">
          <Box w="70px" />

          <Box marginRight="-110">
            <Box
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginLeft="2px">
                <Image
                  src={Kudirat}
                  alt="Logo"
                  w="398px"
                  h="191px"
                  data-aos="fade-left"
                  data-aos-duration="10000"
                />
              </Box>
            </Box>
            <Box w="10" />

            <Box
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginRight="40px">
                <Image
                  src={Adeola}
                  alt="Logo"
                  w="398px"
                  h="191px"
                  data-aos="fade-right"
                  data-aos-duration="10000"
                />
              </Box>
              <Box h="5" />
            </Box>
          </Box>

          <Box w="-20px" />

          <Box
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
          >
            <Box>
              <Image
                src={CenterMed}
                alt="Logo"
                w="306px"
                h="413px"
                data-aos="zoom-in"
                data-aos-duration="10000"
              />
            </Box>
            <Box h="5" />
          </Box>

          <Box w="-20px" />
          <Box marginLeft="-110px">
            <Box
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginRight="40px">
                <Image
                  src={Joy}
                  alt="Logo"
                  w="398px"
                  h="191px"
                  data-aos="fade-left"
                  data-aos-duration="10000"
                />
              </Box>
            </Box>
            <Box w="10" />
            <Box
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginRight="10px">
                <Image
                  src={Gift}
                  alt="Logo"
                  w="398px"
                  h="191px"
                  data-aos="fade-right"
                  data-aos-duration="10000"
                />
              </Box>
              <Box h="5" />
            </Box>
          </Box>
        </Box>
        <Box h="60px" />
      </Box>
      <Box
        marginLeft="300px"
        marginBottom="80px"
        bg="#D087E2"
        padding="40px"
        w="750px"
        borderRadius="10px"
      >
        <FormControl display="flex" alignItems="center">
          <FormLabel
            htmlFor="email-alerts"
            mb="0"
            fontFamily="body"
            fontSize="20px"
          >
            Don't want to miss out on any information? Subscribe to our
            newsletter
          </FormLabel>
          <Switch
            size="lg"
            id="email-alerts"
            isChecked={isSwitchOn}
            onChange={handleSwitchToggle}
            colorScheme={isSwitchOn ? "green" : "gray"}
          />
        </FormControl>
        {isSwitchOn && (
          <form>
            <FormControl marginLeft="150px" w="400px" marginTop="10px">
              <Input type="email" id="email" placeholder="Enter your email" />
            </FormControl>
            <Button
              type="submit"
              mt="4"
              color="white"
              bg="#A210C6"
              marginLeft="-45px"
            >
              Subscribe
            </Button>
          </form>
        )}
      </Box>
      <Footer />
      <GetStartedModal isOpen={isOpen} onClose={onClose} />
    </ChakraProvider>
  );
};

export default LandingPage;
