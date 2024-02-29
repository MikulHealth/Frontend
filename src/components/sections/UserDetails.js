import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { GetCurrentUser } from "../../apiCalls/UserApis";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  VStack,
  Flex,
  Image,
  Text,
  Divider,
  Button,
  DrawerFooter,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import defaultImage from "../../assets/userImage.svg";
import EditProfileModal from "./EditUser";

const UserDetailsDrawer = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        try {
          console.log("Calling GetCurrentUser API");
          const response = await GetCurrentUser();

          if (response.success) {
            console.log("API response:", response.data);
            setUser(response.data);
          } else {
            console.error("API request failed:", response.error);
          }
        } catch (error) {
          console.error("Error in GetCurrentUser API:", error);
        }
      } else {
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = () => {
    navigate("/edit-profile");
    onClose();
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            color="#A210C6"
          >
            Profile Details
            <IconButton
              icon={<CloseIcon />}
              onClick={onClose}
              aria-label="Close drawer"
            />
          </DrawerHeader>
          <DrawerBody>
            <Flex>
              <VStack
                marginLeft="20px"
                marginTop="30px"
                align="center"
                spacing={4}
              >
                <Text>
                  Name:{" "}
                  <Text
                    as="span"
                    fontWeight="bold"
                  >{`${user?.firstName} ${user?.lastName}`}</Text>
                </Text>
                <Divider my={1} borderColor="gray.500" />
                <Text>
                  Home address:{" "}
                  <Text as="span" fontWeight="bold">{`${user?.address}`}</Text>
                </Text>
                <Divider my={1} borderColor="gray.500" />
                <Text>
                  Email:{" "}
                  <Text as="span" fontWeight="bold">{`${user?.email}`}</Text>
                </Text>
                <Divider my={1} borderColor="gray.500" />
                <Text>
                  Phone Number:{" "}
                  <Text
                    as="span"
                    fontWeight="bold"
                  >{`${user?.phoneNumber}`}</Text>
                </Text>
                <Divider my={1} borderColor="gray.500" />
                <Text>
                  Date of birth:{" "}
                  <Text as="span" fontWeight="bold">{`${formatDate(
                    user?.dob
                  )}`}</Text>
                </Text>
                <Divider my={1} borderColor="gray.500" />
                <Text>
                  Gender:{" "}
                  <Text as="span" fontWeight="bold">{`${user?.gender}`}</Text>
                </Text>
                <Divider my={1} borderColor="gray.500" />
              </VStack>

              <Avatar
                src={user?.image}
                // name={user?.firstName}
                alt="User Image"
                borderRadius="8px"
                h="55vh"
                w="20vw"
                marginLeft="50px"
                marginTop="40px"
                bg="#A210C6"
              ></Avatar>
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Text
              fontSize="19px"
              marginRight="20px"
              onClick={handleEditClick}
              style={{
                color: "#A210C6",
                fontStyle: "italic",
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Edit Profile
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
      />
    </>
  );
};

export default UserDetailsDrawer;
