import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    useDisclosure,
    Box,
    Input,
    Button,
    Link as ChakraLink,
    HStack,
    Spacer,
    Image,
    extendTheme,
    ChakraProvider,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Divider,
    Switch,
    FormControl,
    FormLabel,
  } from "@chakra-ui/react";
  import logo from "../../assets/Whitelogo.png";

export default function NavigationBar() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [timeoutId, setTimeoutId] = useState(null);

    const handleMouseOver = () => {
        // Open the modal when the user hovers over the button
        onOpen();
      };
    
      const handleMouseOut = () => {
        // Close the modal when the user moves the cursor away from the button
        onClose();
      };
    
  return (
    <div style={{
        position: "sticky",
    }}>
       <Box
          bg="#A210C6"
          p={3}
          color="white"
          position="sticky"
          top="0"
          zIndex="1000"
          borderBottom="1px solid white"
        >
          <HStack spacing={10}>
            <Box w="5px" />
            <a href="/">
              <Image src={logo} alt="Logo" w="100px" h="30px" />
            </a>

            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Link
              to="/"
              style={{ textDecoration: "underline", color: "white" }}
            >
              Home
            </Link>

            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Spacer />
            <Button
              bg="white"
              color="#A210C6"
              //  onMouseOver={handleMouseOver}
              //  onMouseOut={handleMouseOut}
              onClick={onOpen}
            >
              Get started
            </Button>
          </HStack>
        </Box>

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="gray">
            <ChakraLink fontStyle="italic" href="/login" color="#A210C6">
              <Button
                marginTop="30px"
                marginLeft="80px"
                bg="gray"
                color="black"
                w="300px"
                border="1px solid white"
              >
                Login
              </Button>
            </ChakraLink>
            <ChakraLink
              fontStyle="italic"
              href="/customer-signUp"
              color="#A210C6"
            >
              <Button
                marginTop="30px"
                marginLeft="80px"
                bg="gray"
                color="black"
                w="300px"
                border="1px solid white"
              >
                Sign up
              </Button>
            </ChakraLink>
            <ChakraLink fontStyle="italic" href="/join" color="#A210C6">
              <Button
                marginTop="30px"
                marginLeft="80px"
                bg="gray"
                color="black"
                w="300px"
                border="1px solid white"
              >
                Sign up as medic
              </Button>
            </ChakraLink>
            <ModalCloseButton />

            <ModalFooter>
              <Button
                marginTop="30px"
                marginLeft="200px"
                bg="black"
                color="white"
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </div>
  )
}
