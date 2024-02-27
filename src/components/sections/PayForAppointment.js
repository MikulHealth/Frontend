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
    const costOfService = appointment.appointment.costOfService;
    const appointmentId = appointment.appointment.id;
    console.log("ego", costOfService)
    console.log("idi", appointmentId)
    navigate("/make-payment", { state: { costOfService, appointmentId } });
  };

  return (
    <Modal theme={customTheme} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <WarningIcon w={10} h={10} color="yellow.500" />
        </ModalHeader>

        <ModalBody>
          <Text>
            {" "}
            Hello {user?.firstName}, We notice your pending appointment has not
            been paid for, kindly make payment to get matched with a caregiver.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            leftIcon={<CheckIcon />}
            bg="#A210C6"
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
