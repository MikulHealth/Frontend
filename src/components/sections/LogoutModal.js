// LogoutModal.js
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="#A210C6.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent
        border="2px solid #A210C6"
        borderRadius="25px 25px 25px 0px"
      >
        <ModalHeader>Logout Confirmation</ModalHeader>
        <ModalBody>Are you sure you want to logout?</ModalBody>
        <ModalFooter>
          <Button color="white" bg="#A210C6" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button  bg="red.500" color="white" onClick={onConfirm}>
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
