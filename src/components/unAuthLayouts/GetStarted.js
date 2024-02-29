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
            color="#A210C6"
            bg="white"
            border="1px solid #A210C6"
          >
            Login
          </Button>
        </ChakraLink>
        <ChakraLink fontStyle="italic" href="/customer-signUp" color="#A210C6">
          <Button
            marginTop="30px"
            color="#A210C6"
            bg="white"
            border="1px solid #A210C6"
          >
            Sign up
          </Button>
        </ChakraLink>
        <ChakraLink fontStyle="italic" href="/join" color="#A210C6">
          <Button
            marginTop="30px"
            color="#A210C6"
            bg="white"
            border="1px solid #A210C6"
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
