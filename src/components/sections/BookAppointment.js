import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Progress,
  DrawerCloseButton,
  Box,
  VStack,
  Button,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import SelfAppointmentModal from "./SelfAppointmentForm";
import BeneficiaryAppointmentModal from "./OthersAppForm";
import BeneficiariesModal from "./Beneficiaries";

const BookAppointmentModal = ({ isOpen, onClose }) => {
  const [isSelfAppointmentModalOpen, setSelfAppointmentModalOpen] =
    useState(false);
  const [
    isBeneficiaryAppointmentModalOpen,
    setBeneficiaryAppointmentModalOpen,
  ] = useState(false);
  const [pages, setPages] = useState(null);
  const [isBookAppointmentModalOpen, setBookAppointmentModalOpen] =
    useState(false);

  const handleOpenSelfAppointmentModal = (numPages) => {
    setPages(numPages);
    setSelfAppointmentModalOpen(true);
  };

  const handleCloseSelfAppointmentModal = () => {
    setSelfAppointmentModalOpen(false);
    setPages(null);
  };

  const handleOpenBookAppointmentModal = () => {
    setBookAppointmentModalOpen(true);
  };
  const handleOpenBeneficiaryAppointmentModal = (numPages) => {
    setPages(numPages);
    setBeneficiaryAppointmentModalOpen(true);
  };

  const handleCloseBeneficiaryAppointmentModal = () => {
    setBeneficiaryAppointmentModalOpen(false);
    setPages(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent
        border="5px solid white"
        borderRadius="25px 25px 25px 0px"
        maxH="48vh"
        bg="yellow.070"
      >
        <ModalHeader  color="#A210C6" fontWeight="bold">Book appointment</ModalHeader>
        <ModalCloseButton color="#A210C6" />
        <ModalBody>
          {/* <Progress size="xs" isIndeterminate /> */}
          <VStack spacing={4} marginBottom="20px">
            <Box
              borderWidth="1px"
              borderColor="white"
              bg="white"
              color="#A210C6"
              onClick={() => handleOpenSelfAppointmentModal(2)}
              w="400px"
              h="7vh"
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
              Book for yourself
            </Box>
            <Box
              borderWidth="1px"
              borderColor="#A210C6"
              bg="white"
              color="#A210C6"
              onClick={() => handleOpenBookAppointmentModal()}
              w="400px"
              h="7vh"
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
              Book for a beneficiary
            </Box>
            <Box
              // borderWidth="1px"
              // borderColor="#A210C6"
              bg="white"
              color="#A210C6"
              onClick={() => handleOpenBeneficiaryAppointmentModal(3)}
              w="400px"
              h="7vh"
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
              Book for others
            </Box>
          </VStack>
        </ModalBody>

        {isSelfAppointmentModalOpen && (
          <SelfAppointmentModal
            isOpen={isSelfAppointmentModalOpen}
            onClose={handleCloseSelfAppointmentModal}
            pages={pages}
          />
        )}
        {isBeneficiaryAppointmentModalOpen && (
          <BeneficiaryAppointmentModal
            isOpen={isBeneficiaryAppointmentModalOpen}
            onClose={handleCloseBeneficiaryAppointmentModal}
            pages={pages}
          />
        )}
        {isBookAppointmentModalOpen && (
          <BeneficiariesModal
            isOpen={isBookAppointmentModalOpen}
            onClose={() => setBookAppointmentModalOpen(false)}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookAppointmentModal;
