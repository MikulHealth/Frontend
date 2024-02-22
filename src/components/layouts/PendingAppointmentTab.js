import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../utils/Spiner";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import {EditIcon, CheckIcon} from '@chakra-ui/icons'
import EditPendingAppointmentModal from "../sections/EditPendingAppointmentModal";
import {
  VStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Progress,
  Button,
  useToast,
  Box,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";

export default function PendingApp() {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState();
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [cancellingAppointmentId, setCancellingAppointmentId] = useState(null);
  const handleCancelAppointment = (appointmentId) => {
    setCancellingAppointmentId(appointmentId);
    setConfirmationModalOpen(true);
  };

  const handleCancelModalClose = () => {
    setConfirmationModalOpen(false);
  };

  const handlePayment = () => {
    navigate("/make-payment");
  };

  const handleEditAppointment = (id) => {
    setSelectedAppointmentId(id);
    setEditModalOpen(true);
    setDetailsModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.get(
        "http://localhost:8080/v1/appointment/pendingAppointments",
        config
      );

      if (response.data.success) {
        setPendingAppointments(response.data.data);
      } else {
        console.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [toast]);

  const formattedCost = (cost) => {
    // Divide costOfService by 100 to represent the amount in naira
    const costInNaira = cost / 100;

    // Format the costOfService as naira with the last two zeros separated by a dot
    const formattedCost =
      "₦ " + costInNaira.toLocaleString("en-NG", { maximumFractionDigits: 2 });

    return formattedCost;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const fetchAndDisplayAppointmentDetails = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `http://localhost:8080/v1/appointment/findPendingAppointmentDetails/${appointmentId}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(apiUrl, { headers });

      if (response && response.data && response.data.success) {
        console.log("Appointment details:", response.data.data);
        setSelectedAppointment(response.data.data.data);
        setDetailsModalOpen(true);
      } else {
        console.error("Error fetching appointment details");
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching appointment details:",
        error
      );
    }
  };

  const handleOpenAppointmentModal = () => {
    setShowAppointmentModal(true);
  };

  const handleConfirmation = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `http://localhost:8080/v1/appointment/cancelAppointment/${cancellingAppointmentId}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(apiUrl, {}, { headers });

      if (response.data.success) {
        toast({
          title: response.data.message,
          status: "success",
          duration: 6000,
        });
        localStorage.removeItem("appointmentId");
        fetchData();
      } else {
        toast({
          title: "Error canceling appointment",
          description: response.data.message,
          status: "error",
          duration: 6000,
        });
        console.error("Error canceling appointment");
      }
    } catch (error) {
      console.error("An error occurred while canceling appointment:", error);
    } finally {
      setConfirmationModalOpen(false);
    }
  };

  const handleViewMore = async (id) => {
    await fetchAndDisplayAppointmentDetails(id);
    console.log(`View more details for appointment with ID: ${id}`);
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formattedDateTime = new Date(dateTimeString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDateTime;
  };

  return (
    <Box
      className="pending-appointment"
      overflow="scroll"
      marginLeft="2%"
      w="45vw"
      h="28vh"
    >
      {loading ? (
        <LoadingSpinner />
      ) : pendingAppointments.length === 0 ? (
        <Text marginLeft="35px">
          You have no pending appointments yet. click{" "}
          <a
            href="#"
            style={{
              color: "#A210C6",
              fontStyle: "italic",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={handleOpenAppointmentModal}
          >
            book appointment
          </a>{" "}
          to begin.
        </Text>
      ) : (
        <VStack align="start" spacing={4}>
          {pendingAppointments.map((appointment) => (
            <Box key={appointment.id}>
              <Flex>
                <Text fontWeight="bold" color="black">
                  Care beneficiary:
                </Text>
                <Text marginLeft="5px" color="black">
                  {`${appointment.appointment.recipientFirstname} ${appointment.appointment.recipientLastname}`}
                </Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold" color="black">
                  Booked on:
                </Text>
                <Text marginLeft="5px" color="black">
                  {formatDateTime(appointment.createdAt)}
                </Text>
                <Text
                  marginLeft="60px"
                  fontSize="16px"
                  onClick={() => handleViewMore(appointment.id)}
                  style={{
                    color: "#A210C6",
                    fontStyle: "italic",
                    cursor: "pointer",
                  }}
                  _hover={{ color: "#A210C6" }}
                >
                  Details
                </Text>
                <Text
                  marginLeft="60px"
                  fontSize="16px"
                  onClick={() => handleCancelAppointment(appointment.id)}
                  style={{
                    color: "red",
                    fontStyle: "italic",
                    cursor: "pointer",
                  }}
                  _hover={{ color: "#A210C6" }}
                >
                  Cancel
                </Text>
              </Flex>

              <Divider my={4} borderColor="gray.500" />
            </Box>
          ))}
        </VStack>
      )}
      {detailsModalOpen && selectedAppointment && (
        <Modal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          size="4xl"
        >
          <ModalOverlay />
          <ModalContent overflowY="auto">
            <ModalHeader color="#A210C6">Appointment Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Progress size="xs" isIndeterminate />
              <Flex marginTop="10px" marginLeft="80px">
                <Flex>
                  <Box marginRight="20px">
                    <Flex>
                      <Text fontWeight="bold">Status</Text>
                      <Text
                        fontSize="16px"
                        marginLeft="20px"
                        color={
                          selectedAppointment.appointmentCompleted
                            ? "green.500"
                            : selectedAppointment.appointmentActive
                            ? "blue.500"
                            : selectedAppointment.appointmentMatched
                            ? "yellow.500"
                            : selectedAppointment.appointmentPending
                            ? "yellow.500"
                            : "black"
                        }
                      >
                        {selectedAppointment.appointmentCompleted
                          ? "Completed"
                          : selectedAppointment.appointmentActive
                          ? "Active"
                          : selectedAppointment.appointmentMatched
                          ? "Paired"
                          : selectedAppointment.appointmentPending
                          ? "Pending"
                          : "Unknown"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                    <Flex>
                      <Text fontWeight="bold" color="black">
                        Beneficiary name:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {selectedAppointment.recipientFirstname &&
                        selectedAppointment.recipientLastname
                          ? `${selectedAppointment.recipientFirstname} ${selectedAppointment.recipientLastname}`
                          : "Not available"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                    <Flex marginTop="5px">
                      <Text fontWeight="bold" color="black">
                        Phone Number:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {selectedAppointment.recipientPhoneNumber ||
                          "Not available"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                    <Flex marginTop="5px">
                      <Text fontWeight="bold" color="black">
                        Gender:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {selectedAppointment.recipientGender || "Not available"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                    <Flex marginTop="5px">
                      <Text fontWeight="bold" color="black">
                        Date of Birth:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {formatDate(selectedAppointment.recipientDOB) ||
                          "Not available"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                    <Flex marginTop="5px">
                      <Text fontWeight="bold" color="black">
                        Current Location:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {selectedAppointment.currentLocation || "Not availabe"}
                      </Text>
                    </Flex>

                    <Divider my={4} borderColor="gray.500" />

                    <Flex marginTop="5px">
                      <Text fontWeight="bold" color="black">
                        Relationship:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {selectedAppointment.relationship || "Nil"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                    <Flex marginTop="5px" marginBottom="10px">
                      <Text fontWeight="bold" color="black">
                        Booked on:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {formatDateTime(selectedAppointment.createdAt)}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                  </Box>
                  <Box marginRight="20px">
                    <Flex>
                      <Text fontWeight="bold" color="black">
                        Shift:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {selectedAppointment.shift || "Not availabe"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />

                    <Flex marginTop="5px">
                      <Text fontWeight="bold" color="black">
                        Service Plan:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {selectedAppointment.servicePlan || "Not availabe"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                    <Flex marginTop="5px">
                      <Text fontWeight="bold" color="black">
                        Type of caregiver:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {selectedAppointment.medicSpecialization ||
                          "Not availabe"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                    <Flex marginTop="5px">
                      <Text fontWeight="bold" color="black">
                        Cost of service:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {formattedCost(selectedAppointment.costOfService) ||
                          "Not availabe"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                    <Flex marginTop="5px">
                      <Text fontWeight="bold" color="black">
                        Start Date:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {formatDate(selectedAppointment.startDate) ||
                          "Not availabe"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                    <Flex marginTop="5px">
                      <Text fontWeight="bold" color="black">
                        End Date:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {formatDate(selectedAppointment.endDate) ||
                          "Not availabe"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                    <Flex marginTop="5px">
                      <Text fontWeight="bold" color="black">
                        Medical Report:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {selectedAppointment.medicalReport || "Not availabe"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                    <Flex marginTop="5px">
                      <Text fontWeight="bold" color="black">
                        Paid:
                      </Text>
                      <Text marginLeft="20px" color="black">
                        {selectedAppointment.paid ? "Yes" : "No"}
                      </Text>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                  </Box>
                </Flex>
              </Flex>
              <Box>
                <Flex marginTop="5px">
                  <Text marginLeft="80px" fontWeight="bold" color="black">
                    Health History:
                  </Text>
                  <Text
                    marginLeft="10px"
                    color="black"
                    maxW="600px"
                    maxH="1000px"
                  >
                    {selectedAppointment.recipientHealthHistory ||
                      "Not available"}
                  </Text>
                </Flex>

                <Divider my={4} borderColor="gray.500" />
                <Button
                  marginLeft="300px"
                  bg="#A210C6"
                  marginTop="10px"
                  marginBottom="10px"
                  color="white"
                  _hover={{ color: "" }}
                  leftIcon={<EditIcon />} 
                  onClick={handleEditAppointment}
                >
                  Update appointment details
                </Button>
              </Box>
              {!selectedAppointment.paid && (
                <Button
                  marginLeft="320px"
                  bg="#A210C6"
                  marginTop="10px"
                  marginBottom="10px"
                  color="white"
                  _hover={{ color: "" }}
                  onClick={handlePayment}
                  leftIcon={<CheckIcon />} 
                >
                  Pay for appointment
                </Button>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {confirmationModalOpen && (
        <Modal
          isOpen={confirmationModalOpen}
          onClose={handleCancelModalClose}
          size="md"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to cancel this appointment? <br></br>
              This action is irreversible.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={handleCancelModalClose}>
                No
              </Button>
              <Button marginLeft="5px" onClick={handleConfirmation}>
                Yes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <EditPendingAppointmentModal
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        appointmentDetails={selectedAppointment}
      />
    </Box>
  );
}
