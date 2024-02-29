import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";

export default function GetStartedModal({ isOpen, onClose }) {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent alignItems="center" bg="yellow.070">
        <ChakraLink fontStyle="italic" href="/login" color="#A210C6">
          <Button
            marginTop="30px"
            color="white"
            bg="#A210C6"
            border="1px solid white"
          >
            Login
          </Button>
        </ChakraLink>
        <ChakraLink fontStyle="italic" href="/customer-signUp" color="#A210C6">
          <Button
            marginTop="30px"
            color="white"
            bg="#A210C6"
            border="1px solid white"
          >
            Sign up
          </Button>
        </ChakraLink>
        <ChakraLink fontStyle="italic" href="/join" color="#A210C6">
          <Button
            marginTop="30px"
            color="white"
            bg="#A210C6"
            border="1px solid white"
          >
            Sign up as medic
          </Button>
        </ChakraLink>
        <ModalCloseButton color="white" />

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
