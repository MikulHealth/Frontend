import React from "react";
import Folder from "../../assets/Folder.svg";
import Papa from "../../assets/ElderlyPapa.svg";
import { NavLink } from "react-router-dom";
import WhatsAppIcon from "../../assets/WhatsApp.svg";
import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Link as ChakraLink,
  Image,
  Text,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
} from "@chakra-ui/react";
export default function Faqs() {
  const handleClick = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <Box bg="white">
        <Divider />
        <Box h="60px" />
        <Box>
          <Text
            fontSize="48px"
            fontWeight="bold"
            fontFamily="Montserrat"
            color="black"
          >
            Frequently Asked Questions
          </Text>
          <Box h="5" />
        </Box>
        <Box h="20px" />
        <Box display="flex" marginLeft="80px">
          <Flex
            marginTop="600px"
            boxShadow="0 8px 12px rgba(0,0,0,0.2)" 
            borderRadius="50%"
            p="2" 
            bgColor="white"
          >
            <NavLink to="/" onClick={handleClick}>
              <ArrowUpIcon boxSize={8} />
            </NavLink>
          </Flex>

          <Box>
            <Accordion
              allowToggle
              w="520px"
              data-aos="fade-down"
              data-aos-duration="10000"
            >
              <AccordionItem
                p={4}
                my={3}
                fontSize="24px"
                className="custom-accordion-item"
              >
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left" fontSize="21px">
                      How do I get matched with a medic?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  textAlign="justify"
                  className="custom-accordion-panel"
                >
                  Upon a successful registeration, you can request and get
                  matched to a medic to recieve care by booking any of the
                  services we offer from your dashboard.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                p={4}
                my={3}
                fontSize="24px"
                className="custom-accordion-item"
              >
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left" fontSize="21px">
                      How safe am I?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  className="custom-accordion-panel"
                  textAlign="justify"
                >
                  To ensure you are safe while you receive care from any
                  Mikul&nbsp;Health care provider, we make sure our caregivers
                  are vetted and their background checked. We also have an
                  insurance policy for any theft and damages during the course
                  of our service.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                p={4}
                my={3}
                fontSize="24px"
                className="custom-accordion-item"
              >
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left" fontSize="21px">
                      Can I request for a replacement?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  textAlign="justify"
                  className="custom-accordion-panel"
                >
                  Yes you can have a replacement when asigned a caregiver that
                  you do not like. We can provide a replace within 72 hours upon
                  your request for a replacement.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem
                p={4}
                my={3}
                fontSize="24px"
                className="custom-accordion-item"
              >
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left" fontSize="21px">
                      How long does it take to receive care?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  textAlign="justify"
                  className="custom-accordion-panel"
                >
                  Upon booking and making payment for the choosen service, you
                  would receive care within 48 hours.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                p={4}
                my={3}
                fontSize="24px"
                className="custom-accordion-item"
              >
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left" fontSize="21px">
                      Can I get a customized service plan?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  textAlign="justify"
                  className="custom-accordion-panel"
                >
                  Yes, aside our standadized service plans. We also have
                  provision for customizing a service plan that would best suit
                  you or your loved according to the peculiarity of the care
                  needs.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem
                p={4}
                my={3}
                fontSize="18px"
                className="custom-accordion-item"
              >
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left" fontSize="21px">
                      How qualified are the medics?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  textAlign="justify"
                  className="custom-accordion-panel"
                >
                  <Text>
                    We work with Registred Nurses and Medical Docters who are
                    acreditated and certified with valid licenses and a proven
                    record of good conduct and expertise. We also ensure that
                    our Nurse assistant caregivers are well trained.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          <Box w="-20px" />
          <Box marginTop="-15px">
            <Box
              bg="white"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginRight="30px">
                <Image
                  src={Folder}
                  alt="Logo"
                  w="551px"
                  h="280px"
                  data-aos="fade-left"
                  data-aos-duration="10000"
                />
              </Box>
            </Box>
            <Box
              marginTop="-25px"
              bg="white"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginRight="30px">
                <Image
                  src={Papa}
                  alt="Logo"
                  w="551px"
                  h="280px"
                  data-aos="fade-right"
                  data-aos-duration="10000"
                />
              </Box>
              <Box marginLeft="500px" marginTop="-75px">
                <a href="https://example.com">
                  <Image
                    src={WhatsAppIcon}
                    alt="Logo"
                    w="80px"
                    h="80px"
                    data-aos="fade-down"
                    data-aos-duration="10000"
                  />
                </a>
              </Box>
              <Box h="5" />
            </Box>
          </Box>
        </Box>
        <Box h="40px" />
      </Box>
    </div>
  );
}
