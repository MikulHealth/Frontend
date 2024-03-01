import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  extendTheme,
  Text,
} from "@chakra-ui/react";

const customTheme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Gill Sans MT, sans-serif",
  },
});

const PayForAppointmentModal = ({ isOpen, onClose, appointment }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);

  const handlePayment = () => {
    const costOfService = appointment.costOfService;
    const appointmentId = appointment.id;
    const beneficiary =
      appointment.recipientFirstname + " " + appointment.recipientLastname;
    console.log("ego", costOfService);
    console.log("idi", appointmentId);
    navigate("/make-payment", {
      state: { costOfService, appointmentId, beneficiary },
    });
  };

  return (
    <Modal theme={customTheme} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        border="5px solid white"
        borderRadius="25px 25px 25px 0px"
        bg="#510863"
      >
        <ModalHeader>
          <WarningIcon w={10} h={10} color="yellow.400" />
        </ModalHeader>

        <ModalBody>
          <Text color="white">
            {" "}
            Hello {user?.firstName}, We notice your pending appointment has not
            been paid for, kindly make payment to get matched with a caregiver.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            leftIcon={<CheckIcon />}
            bg="green.400"
            color="white"
            mr={3}
            onClick={handlePayment}
          >
            Pay for appointment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PayForAppointmentModal;
