import React, { useState, useEffect } from "react";
import LeftSideBar from "../authLayouts/LeftSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../authLayouts/NavBar";
import "react-datepicker/dist/react-datepicker.css";
import {
  ChakraProvider,
  VStack,
  Input,
  Button,
  useToast,
  InputGroup,
  InputRightElement,
  Image,
  Box,
  Text,
  IconButton,
  Flex,
  Link,
  Divider,
  FormControl,
  FormLabel,
  extendTheme,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import SettingsSideBar from "../authLayouts/SettingsSideBar";

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

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.oldPassword) errors.oldPassword = "*Required";

    if (!values.newPassword) errors.newPassword = "*Required";
    else if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}/.test(
        values.newPassword
      )
    )
      errors.newPassword =
        "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long";

    if (!values.confirmPassword) errors.confirmPassword = "*Required";
    else if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}/.test(
        values.confirmPassword
      )
    )
      errors.confirmPassword =
        "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long";

    if (values.newPassword !== values.confirmPassword)
      errors.confirmPassword = "Password do not match";

    return errors;
  };

  const handleSaveChanges = async () => {
    // Validate passwords
    const validationErrors = validate({
      oldPassword,
      newPassword,
      confirmPassword,
    });

    if (Object.keys(validationErrors).length > 0) {
      // Display validation errors using toast messages
      Object.values(validationErrors).forEach((error) => {
        toast({
          title: "Validation Error",
          description: error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
      return;
    }

    // API call to update the password
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8080/v1/angel/change-password",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const responseData = await response.json(); // Parse the response JSON

      if (response.ok && responseData.success) {
        toast({
          title: "Password Updated",
          description: response.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error("API error:", responseData.message);
        toast({
          title: "Password reset failed",
          description: responseData.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Network error:", error.message);
      toast({
        title: "Network Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    // Reset the form fields after saving changes
    // setOldPassword("");
    // setNewPassword("");
    // setConfirmPassword("");
  };

  return (
    <ChakraProvider theme={customTheme}>
      <LeftSideBar />
      <VStack marginLeft="-70px" w="80%" h="100vh">
        <Box marginTop="4px" marginLeft="270px">
          <NavBar />
          <Flex>
            <SettingsSideBar />
            <Box
              marginTop="30px"
              className="change-password"
              marginLeft="50px"
              width="80%"
              p={3}
              h="80vh"
            >
              {" "}
              <VStack marginLeft="50px" spacing={3} align="center">
                <Text fontFamily="heading" fontSize="20px">
                  Change password
                </Text>
                <FormControl>
                  <FormLabel>Old Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showOldPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={handleOldPasswordChange}
                      borderColor="black"
                      _hover={{ color: "" }}
                    />

                    <InputRightElement width="4.5rem">
                      <IconButton
                        h="1.75rem"
                        size="sm"
                        onClick={handleToggleOldPassword}
                        icon={showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                      />
                      {/* <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleToggleOldPassword}
                      bg="gray"
                      color="white"
                    >
                      {showOldPassword ? "Hide" : "Show"}
                    </Button> */}
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>New Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      borderColor="black"
                      _hover={{ color: "" }}
                    />
                    <InputRightElement width="4.5rem">
                      <IconButton
                        h="1.75rem"
                        size="sm"
                        onClick={handleToggleNewPassword}
                        icon={showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Confirm New Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      borderColor="black"
                      _hover={{ color: "" }}
                    />
                    <InputRightElement width="4.5rem">
                      <IconButton
                        h="1.75rem"
                        size="sm"
                        onClick={handleToggleConfirmPassword}
                        icon={showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button color="white" bg="#A210C6" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </VStack>
            </Box>
          </Flex>
        </Box>
      </VStack>
    </ChakraProvider>
  );
};
export default ChangePasswordPage;
