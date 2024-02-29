import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Progress,
  DrawerCloseButton,
  Box,
  VStack,
  Button,
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
    <Drawer  isOpen={isOpen} onClose={onClose} size="md" placement="right">
      <DrawerOverlay />
      <DrawerContent maxH="45vh" >
        <DrawerHeader color="#A210C6">Book appointment</DrawerHeader>
        <DrawerCloseButton color="white" />
        <DrawerBody>
          {/* <Progress size="xs" isIndeterminate /> */}
          <VStack spacing={4} marginTop="10px">
            <Box
              borderWidth="1px"
              borderColor="white"
              bg="#A210C6"
              color="white"
              onClick={() => handleOpenSelfAppointmentModal(2)}
              w="400px"
              h="7vh"
              padding="10px"
              borderRadius="8px"
              fontWeight="bold"
              style={{
                fontStyle: "italic",
                cursor: "pointer",
              }}
            >
              Book for yourself
            </Box>
            <Box
              borderWidth="1px"
              borderColor="#A210C6"
              bg="#A210C6"
              color="white"
              onClick={() => handleOpenBookAppointmentModal()}
              w="400px"
              h="7vh"
              padding="10px"
              borderRadius="8px"
              fontWeight="bold"
              style={{
                fontStyle: "italic",
                cursor: "pointer",
              }}
            >
              Book for your beneficiary
            </Box>
            <Box
              borderWidth="1px"
              borderColor="#A210C6"
              bg="#A210C6"
              color="white"
              onClick={() => handleOpenBeneficiaryAppointmentModal(3)}
              w="400px"
              h="7vh"
              padding="10px"
              borderRadius="8px"
              fontWeight="bold"
              style={{
                fontStyle: "italic",
                cursor: "pointer",
              }}
            >
              Book for others
            </Box>
          </VStack>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
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
      </DrawerContent>
    </Drawer>
  );
};

export default BookAppointmentModal;
