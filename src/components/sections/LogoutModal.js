import { WarningIcon } from "@chakra-ui/icons";
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
      <ModalOverlay />
      <ModalContent
        border="5px solid #A210C6"
        borderRadius="25px 25px 25px 0px"
      >
        <ModalHeader><WarningIcon w={10} h={10} color="yellow.400" /></ModalHeader>
        <ModalBody>Are you sure you want to logout?</ModalBody>
        <ModalFooter>
          <Button color="white" bg="#A210C6" mr={3} onClick={onClose}>
            No
          </Button>
          <Button bg="red.500" color="white" onClick={onConfirm}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
