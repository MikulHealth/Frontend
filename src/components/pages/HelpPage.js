import React  from "react";
import "react-datepicker/dist/react-datepicker.css";
import WhatsAppIcon from "../../assets/WhatsApp.svg";
import LeftSideBar from "../authLayouts/LeftSideBar";
import NavBar from "../authLayouts/NavBar";

import {
  ChakraProvider,
  VStack,
  Image,
  Box,
  Text,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  extendTheme,
} from "@chakra-ui/react";

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

const HelpPage = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <LeftSideBar />
      <VStack marginLeft="80px" height="100vh" w="100vw">
        <NavBar />
        <Box w="75%" h="100vh">
          <SettingsSideBar />
          <Flex>
            <VStack marginLeft="120px">
              <Box marginTop="-370px">
                <Text fontFamily="body" color="#A210C6" fontSize="24px">
                  Frequently Asked Questions
                </Text>
                <Text fontStyle="italic" fontSize="16px">
                  Click on a question to see more details
                </Text>
              </Box>
              <Box marginLeft="170px">
                <Accordion
                  allowToggle
                  w="500px"
                  data-aos="fade-down"
                  data-aos-duration="10000"
                >
                  <AccordionItem
                    p={-6}
                    my={5}
                    fontSize="14px"
                    className="custom-accordion-item"
                  >
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize="14px"
                        >
                          How do I add my loved ones as beneficiaries?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      textAlign="justify"
                      fontSize="14px"
                      className="custom-accordion-panel"
                    >
                      Upon a successful registeration, you can request and get
                      matched to a medic to recieve care by booking any of the
                      services we offer from your dashboard.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem
                    p={-6}
                    my={5}
                    fontSize="12px"
                    className="custom-accordion-item"
                  >
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize="14px"
                        >
                          I entered the wrong details while booking my
                          appointment. How do I change it?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      textAlign="justify"
                      fontSize="14px"
                      className="custom-accordion-panel"
                    >
                      To ensure you are safe while you receive care from any
                      Mikul&nbsp;Health care provider, we make sure our
                      caregivers are vetted and their background checked. We
                      also have an insurance policy for any theft and damages
                      during the course of our service.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem
                    p={-6}
                    my={5}
                    fontSize="14px"
                    className="custom-accordion-item"
                  >
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize="14px"
                        >
                          I would like to book multiple services at the same
                          time. How do I do that?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      textAlign="justify"
                      fontSize="14px"
                      className="custom-accordion-panel"
                    >
                      Yes you can have a replacement when asigned a caregiver
                      that you do not like. We can provide a replace within 72
                      hours upon your request for a replacement.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem
                    p={-6}
                    my={5}
                    fontSize="14px"
                    className="custom-accordion-item"
                  >
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize="14px"
                        >
                          I am no longer interested in using this service. How
                          can I cancel?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      textAlign="justify"
                      fontSize="14px"
                      className="custom-accordion-panel"
                    >
                      Yes, aside our standadized service plans. We also have
                      provision for customizing a service plan that would best
                      suit you or your loved according to the peculiarity of the
                      care needs.
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
            </VStack>
            <VStack marginLeft="50px" marginTop="-370px">
              <Box textAlign="left">
                <Text color="#A210C6" fontSize="20px">
                  Contact us
                </Text>
                <VStack fontSize="14px">
                  <Text>If you have any issues, our Mikul Customer</Text>
                  <Text>
                    Care agents are always happy to help. You can reach us via:
                  </Text>

                  <Text>
                    Email:{" "}
                    <a
                      href="mailto:support@mikulhealth.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      support@mikulhealth.com
                    </a>{" "}
                    <br></br>
                    Phone: <a href="tel:+2349160596636">+2349160596636</a>
                  </Text>
                </VStack>
              </Box>
              <Box marginLeft="100px" marginTop="100px">
                <a href="https://wa.me/2347032579006">
                  <Image
                    // onClick={help}
                    src={WhatsAppIcon}
                    alt="Logo"
                    w="70px"
                    h="70px"
                    style={{
                      cursor: "pointer",
                      animation: "zoomInOut 2s infinite alternate",
                    }}
                  />
                </a>
                <style>
                  {`
          @keyframes zoomInOut {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.2);
            }
          }
        `}
                </style>
              </Box>
            </VStack>
          </Flex>
        </Box>
      </VStack>
    </ChakraProvider>
  );
};
export default HelpPage;
