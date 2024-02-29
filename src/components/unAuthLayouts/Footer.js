import React from "react";
import FBIcon from "../../assets/FaceBookIcon.svg";
import IGIcon from "../../assets/InstagramIcon.svg";
import WHIcon from "../../assets/WAIcon.svg";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Link as ChakraLink, Flex, Image, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
const Footer = ({ onFaqsClick }) => {
  const handleClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <Box
        borderRadius="10px"
        bg="#A210C6"
        display="flex"
        w="1441"
        h="543"
        pd="48px, 84px, 32px, 60px"
      >
        <Box marginLeft="40px" marginTop="40px">
          <Text fontFamily="body" color="white" fontSize="32px">
            MIKUL HEALTH
          </Text>
          <Text
            fontFamily="Montserrat"
            color="white"
            textAlign="left"
            fontSize="20px"
            marginTop="20px"
          >
            We leverage technological <br></br>
            advancement to provide care<br></br>
            for you and your loved ones.
          </Text>
        </Box>
        <Box marginLeft="380px" marginTop="40px">
          <Text
            fontFamily="body"
            color="white"
            fontSize="32px"
            textDecoration="underline"
          >
            Quick Links
          </Text>
          <NavLink to="/">
            <Text
              fontFamily="Montserrat"
              color="white"
              fontSize="20px"
              marginTop="10px"
            >
             Home
            </Text>
          </NavLink>
          <NavLink to="/about">
            <Text
              fontFamily="Montserrat"
              color="white"
              fontSize="20px"
              marginTop="20px"
            >
              About
            </Text>
          </NavLink>
          <NavLink to="/contact">
            <Text
              fontFamily="Montserrat"
              color="white"
              fontSize="20px"
              marginTop="10px"
            >
              Contact us
            </Text>
          </NavLink>

         
          <NavLink to="/join">
            <Text
              fontFamily="Montserrat"
              color="white"
              fontSize="20px"
              marginTop="10px"
            >
              Join Mikul Health
            </Text>
          </NavLink>
          <NavLink to="https://wa.me/2347032579006">
            <Text
              fontFamily="Montserrat"
              color="white"
              fontSize="20px"
              marginTop="10px"
            >
              Terms and Privacy policy
            </Text>
          </NavLink>
        </Box>
        <Box marginLeft="300px" marginTop="40px">
          <Text
            fontFamily="body"
            color="white"
            fontSize="32px"
            textDecoration="underline"
          >
            Socials
          </Text>
          <Box marginTop="20px" marginLeft="5px" display="flex">
            <a href="https://web.facebook.com/mikulhealthcare/?_rdc=1&_rdr://example.com">
              <Image
                src={FBIcon}
                alt="Logo"
                w="32px"
                h="32px"
                marginLeft="20px"
              />
            </a>
            <a href="https://www.instagram.com/mikulhealth/">
              <Image
                src={IGIcon}
                alt="Logo"
                w="32px"
                h="32px"
                marginLeft="20px"
              />
            </a>
            <a href="https://wa.me/message/3VO5QNBR2AB4L1://example.com">
              <Image
                src={WHIcon}
                alt="Logo"
                w="32px"
                h="32px"
                marginLeft="20px"
              />
            </a>
          </Box>
        </Box>

        <NavLink onClick={handleClick}>
          <ArrowUpIcon
            marginLeft="-100px"
            marginTop="400px"
            boxShadow="0 8px 12px rgba(0,0,0,0.2)"
            borderRadius="50%"
            p="2"
            color="white"
            boxSize={12}
          />
        </NavLink>
      </Box>
    </div>
  );
};
export default Footer;
