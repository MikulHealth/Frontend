import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Button,
  Link as ChakraLink,
  Box,
} from "@chakra-ui/react";

export default function GetStartedModal({ isOpen, onClose }) {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        marginTop="100px"
        border="5px solid white"
        alignItems="center"
        bg="yellow.070"
        borderRadius="25px 25px 25px 0px"
      >
        <ChakraLink fontStyle="italic" href="/login" color="#A210C6">
          <Box
            // border="2px solid #A210C6"
            w="400px"
            h="7vh"
            bg="white"
            marginTop="40px"
            color="#A210C6"
            padding="10px"
            borderRadius="8px"
            fontWeight="bold"
            style={{
              fontStyle: "italic",
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
            }}
            _hover={{
              transform: "translateY(-10px)",
            }}
          >
            Login
          </Box>
        </ChakraLink>
        <ChakraLink fontStyle="italic" href="/customer-signUp" color="#A210C6">
          <Box
            // border="2px solid #A210C6"
            w="400px"
            h="7vh"
            bg="white"
            marginTop="10px"
            color="#A210C6"
            padding="10px"
            borderRadius="8px"
            fontWeight="bold"
            style={{
              fontStyle: "italic",
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
            }}
            _hover={{
              transform: "translateY(-10px)",
            }}
          >
            Sign up
          </Box>
        </ChakraLink>
        <ChakraLink fontStyle="italic" href="/join" color="#A210C6">
          <Box
            // border="2px solid #A210C6"
            w="400px"
            h="7vh"
            bg="white"
            marginTop="10px"
            color="#A210C6"
            padding="10px"
            borderRadius="8px"
            fontWeight="bold"
            style={{
              fontStyle: "italic",
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
            }}
            _hover={{
              transform: "translateY(-10px)",
            }}
          >
            Sign up as medic
          </Box>
        </ChakraLink>
        <ModalCloseButton color="white" />

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
