import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Button,
  Link as ChakraLink,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";

export default function GetStartedModal({ isOpen, onClose }) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const modalWidth = isLargerThan768 ? "400px" : "90vw";

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        marginTop="100px"
        border="5px solid white"
        alignItems="center"
        bg="#510863"
        borderRadius={{ base: "25px 25px 25px 0px", md: "25px 25px 25px 0px" }}
        width={modalWidth}
      >
        <ChakraLink fontStyle="italic" href="/login" color="#A210C6">
          <Box
            w="100%"
            textAlign="center"
            h="7vh"
            bg="white"
            marginTop="40px"
            color="#A210C6"
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
            Login
          </Box>
        </ChakraLink>
        <ChakraLink fontStyle="italic" href="/customer-signUp" color="#A210C6">
          <Box
            w="100%"
            textAlign="center"
            h="7vh"
            bg="white"
            marginTop="20px"
            color="#A210C6"
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
            Sign up
          </Box>
        </ChakraLink>
        <ChakraLink fontStyle="italic" href="/join" color="#A210C6">
          <Box
            w="100%"
            textAlign="center"
            h="7vh"
            bg="white"
            marginTop="20px"
            color="#A210C6"
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
            Sign up as medic
          </Box>
        </ChakraLink>
        <ModalCloseButton color="white" />
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
