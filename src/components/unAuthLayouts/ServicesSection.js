import React from "react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link as ChakraLink,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import "animate.css";
import Elderly from "../../assets/ElderlyCare.svg";
import PostPaturm from "../../assets/Postpatum.svg";
import Recovery from "../../assets/RecoveryCare.svg";
import Online from "../../assets/OnlineConsult.svg";
import Doctor from "../../assets/Doctor.svg";
import "../../styles/pages/LandingPage.css";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
export default function ServicesSection() {
  const handleClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <Box borderRadius="10px" bg="#A210C6">
        <Box h="60px" />
        <Box>
          <Text
            fontSize="48px"
            fontWeight="bold"
            fontFamily="body"
            color="white"
          >
            Our Services
          </Text>
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
            className="box"
            data-aos="fade-up"
            data-aos-duration="6000"
          >
            <Box marginLeft="40px">
              <Image src={PostPaturm} alt="Postpartum" w="100px" h="30px" />
            </Box>

            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Post-Partum Care
            </Text>
            <Text textAlign="center">
              Get personalized health care <br />
              support for you and your <br />
              newborn.
            </Text>
          </Box>
          <Box w="20" />
          <Box
            bg="white"
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
            className="box"
            data-aos="fade-down"
            data-aos-duration="6000"
          >
            <Box marginLeft="50px">
              <Image src={Elderly} alt="elderly" w="100px" h="30px" />
            </Box>

            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Elderly Care
            </Text>
            <Text textAlign="center">
              Get expert home care services <br />
              for your elderly parents and
              <br />
              loved ones.
            </Text>
          </Box>
          <Box w="20" />
          <Box
            bg="white"
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
            className="box"
            data-aos="fade-up"
            data-aos-duration="6000"
          >
            <Box marginLeft="60px">
              <Image src={Recovery} alt="recovery" w="100px" h="30px" />
            </Box>

            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Recovery Care
            </Text>
            <Text textAlign="center">
              Receive professional in-home <br />
              care after discharge from a <br />
              Hospital or Rehabilitation Centre.
            </Text>
          </Box>
          <Box w="20" />
          <Box
            bg="white"
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
            className="box"
            data-aos="fade-down"
            data-aos-duration="6000"
          >
            <Box marginLeft="50px">
              <Image src={Online} alt="online" w="100px" h="30px" />
            </Box>

            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Online Consult
            </Text>
            <Text textAlign="center">
              Get care from qualified <br />
              medical professionals from the <br />
              comfort of your home.
            </Text>
          </Box>
        </Box>
        <Box h="60px" />
        <Box>
          <Box display="flex">
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
              marginLeft="70px"
              className="box"
              data-aos="zoom-out"
              data-aos-duration="10000"
              h="400px"
              w="420px"
              animation="zoomInOut 8s infinite"
              overflow="hidden"
            >
              <Image
                // borderRadius="100px"
                src={Doctor}
                alt="Logo"
                w="400px"
                h="420px"
              />
            </Box>
            <Box>
              <Box marginLeft="150px">
                <Text
                  fontSize="48px"
                  fontWeight="bold"
                  fontFamily="body"
                  color="white"
                  textAlign="left"
                >
                  Join the Future of
                </Text>
                <Text
                  fontSize="48px"
                  fontWeight="bold"
                  fontFamily="body"
                  color="white"
                  textAlign="left"
                >
                  Healthcare
                </Text>
                <Text
                  textAlign="left"
                  fontSize="20px"
                  color="white"
                  fontFamily="Montserrat"
                >
                  Empower healthcare innovation and shape the future of <br />{" "}
                  Healthcare delivery with Mikul Health
                </Text>

                <ChakraLink href="/join" color="#A210C6">
                  <Button
                    w="10vw"
                    borderRadius="100px"
                    marginTop="20px"
                    marginLeft="-310px"
                    bg="white"
                  >
                    Join us
                  </Button>
                </ChakraLink>
              </Box>
            </Box>
            <Flex
              marginLeft="150px"
              marginTop="400px"
              boxShadow="0 8px 12px rgba(0,0,0,0.2)"
              borderRadius="50%"
              p="2"
              // bgColor="white"
            >
              <NavLink to="/" onClick={handleClick}>
                <ArrowUpIcon color="white" boxSize={8} />
              </NavLink>
            </Flex>
          </Box>
        </Box>
        <Box h="60px" />
      </Box>
    </div>
  );
}
