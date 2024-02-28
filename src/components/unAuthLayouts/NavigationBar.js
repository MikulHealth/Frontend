import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDisclosure, Box, Button, HStack, Spacer, Image } from "@chakra-ui/react";
import logo from "../../assets/Whitelogo.png";
import GetStartedModal from "./GetStarted";

export default function NavigationBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Home");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setPageTitle("Home");
        break;
      case "/about":
        setPageTitle("About");
        break;
      case "/contact":
        setPageTitle("Contact");
        break;
      case "/services":
        setPageTitle("Services");
        break;
      default:
        setPageTitle("Home");
        break;
    }
  }, [location]);

  return (
    <div style={{ position: "sticky" }}>
        <Box
          bg="#A210C6"
          p={3}
          color="white"
          position="sticky"
          top="0"
          zIndex="1000"
          borderBottom="1px solid white"
        >
          <HStack spacing={10}>
            <Box w="5px" />
            <a href="/">
              <Image src={logo} alt="Logo" w="100px" h="30px" />
            </a>

            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Link
              to="/"
              style={{
                textDecoration: pageTitle === "Home" ? "underline" : "none",
                fontWeight: pageTitle === "Home" ? "bold" : "normal",
                color: "white"
              }}
            >
              Home
            </Link>

            <Link
              to="/about"
              style={{
                textDecoration: pageTitle === "About" ? "underline" : "none",
                fontWeight: pageTitle === "About" ? "bold" : "normal",
                color: "white"
              }}
            >
              About
            </Link>

            <Link
              to="/servicesSection"
              style={{
                textDecoration: pageTitle === "Services" ? "underline" : "none",
                fontWeight: pageTitle === "Services" ? "bold" : "normal",
                color: "white"
              }}
            >
              Services
            </Link>

            <Link
              to="/contact"
              style={{
                textDecoration: pageTitle === "Contact" ? "underline" : "none",
                fontWeight: pageTitle === "Contact" ? "bold" : "normal",
                color: "white"
              }}
            >
              Contact
            </Link>
            <Spacer />
            <Button
              bg="white"
              color="#A210C6"
              onClick={onOpen}
            >
              Get started
            </Button>
          </HStack>
        </Box>
      <GetStartedModal isOpen={isOpen} onClose={onClose} /> 
    </div>
  );
}
