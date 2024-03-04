import React from "react";
import "animate.css";
import "aos/dist/aos.css";
import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link as ChakraLink,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import Elderly from "../../assets/ElderlyCare.svg";
import PostPaturm from "../../assets/Postpatum.svg";
import Recovery from "../../assets/RecoveryCare.svg";
import Online from "../../assets/OnlineConsult.svg";
import Doctor from "../../assets/Doctor.svg";
import "../../styles/pages/LandingPage.css";
import { NavLink } from "react-router-dom";

export default function ServicesSection() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Box
        borderRadius="10px"
        bg="#A210C6"
        px={{ base: "20px", md: "40px" }}
        py={{ base: "40px", md: "60px" }}
      >
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="bold"
          fontFamily="body"
          color="white"
          textAlign="center"
          mb="4"
        >
          Our Services
        </Text>

        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          gap={{ base: "20px", md: "40px" }}
        >
          <ServiceBox
            image={PostPaturm}
            title="Post-Partum Care"
            description="Get personalized health care support for you and your newborn."
          />
          <ServiceBox
            image={Elderly}
            title="Elderly Care"
            description="Get expert home care services for your elderly parents and loved ones."
          />
          <ServiceBox
            image={Recovery}
            title="Recovery Care"
            description="Receive professional in-home care after discharge from a Hospital or Rehabilitation Centre."
          />
          <ServiceBox
            image={Online}
            title="Online Consult"
            description="Get care from qualified medical professionals from the comfort of your home."
          />
        </Flex>

        <Flex flexWrap="wrap" justifyContent="center" mt="10">
          <Box
            marginTop={{ base: "0", md: "50px" }}
            marginBottom={{ base: "20px", md: "50px" }}
            marginLeft={{ base: "0", md: "-100px" }}
            padding={{ base: "90px", md: "0px" }}
            className="box"
            data-aos="zoom-out"
            data-aos-duration="10000"
            h={{ base: "auto", md: "500px" }}
            w={{ base: "100%", md: "520px" }}
            animation="zoomInOut 8s infinite"
            overflow="hidden"
            display={{ base: "block", lg: "block" }}
          >
            <Image
              src={Doctor}
              alt="Doctor"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>

          <Flex
            flexDirection="column"
            ml="8"
            marginTop={{ base: "0", md: "150px" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="bold"
              fontFamily="body"
              color="white"
            >
              Join the Future of
            </Text>
            <Text
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="bold"
              fontFamily="body"
              color="white"
            >
              Healthcare
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="white"
              fontFamily="Montserrat"
              mt="2"
            >
              Empower healthcare innovation and shape
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="white"
              fontFamily="Montserrat"
              mt="2"
            >
              the future of Healthcare delivery with Mikul Health
            </Text>
            <ChakraLink href="/join" color="#A210C6">
              <Button mt="4" bg="white" borderRadius="100px" px="6">
                Join us
              </Button>
            </ChakraLink>
          </Flex>
        </Flex>

        <Flex
          alignItems="center"
          justifyContent={{ base: "flex-end", md: "flex-end" }}
          mt="8"
        >
          <NavLink to="/" onClick={handleClick}>
            <ArrowUpIcon
              borderRadius="50%"
              boxShadow="0 8px 12px rgba(0,0,0,0.2)"
              color="white"
              boxSize={{ base: 8, md: 12 }}
            />
          </NavLink>
        </Flex>
      </Box>
    </div>
  );
}

const ServiceBox = ({ image, title, description }) => {
  return (
    <Box
      bg="white"
      borderRadius="20px"
      padding="4"
      textAlign="center"
      w={{ base: "70%", md: "40%" }}
      mt={{ base: "4", md: "0" }}
    >
      <Flex justifyContent="center" alignItems="center" mb="4">
        <Image src={image} alt={title} w="100px" h="auto" />
      </Flex>
      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mt="4">
        {title}
      </Text>
      <Text mt="2">{description}</Text>
    </Box>
  );
};
