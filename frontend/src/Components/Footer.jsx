import React from "react";
import { Flex, Text, Box, Grid, Center, Input, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SlSocialTwitter } from "react-icons/sl"
import { TiSocialFacebook } from "react-icons/ti"
import { TiSocialYoutube } from "react-icons/ti"
import { TiSocialLinkedin } from "react-icons/ti"
import { TiSocialTwitter } from "react-icons/ti"
import { SlSocialSpotify } from "react-icons/sl"

function Footer() {
  return (
    <Box bg="gray.800" p="2rem 0" mt="4rem" pt="3rem">
      <Grid w={["90%", "80%", "70%"]} gap="2rem" gridTemplateColumns={["repeat(1,1fr)", "repeat(2,1fr)", "repeat(3,1fr)"]}
        p={4} justifyContent="space-between" color="white" m="auto"
      >
        <Grid justifyContent={"flex-start"}>
          <Box>LOGO GEAR HUB</Box>
          <Box>
            <Input variant={"unstyled"} borderBottomWidth="2px" p="6px 12px" placeholder="Enter Your Email" fontSize={"1.5rem"} />
            <Button mt="10px" w="full" variant={"unstyled"} borderWidth="1px" p="8px 12px" >Subscribe Now</Button>
          </Box>
        </Grid>
        <Grid gap="10px">
          <Heading>Contact Us</Heading>
          <Center>
            <Text>Phone : </Text>
            <Text pl="3px" fontSize={".8rem"} color="gray.200">+91 1245214512</Text>
          </Center>
          <Center>
            <Text>Email : </Text>
            <Text pl="3px" fontSize={".8rem"} color="gray.200">gearhub@gmail.com</Text>
          </Center>
          <Center color="#fff" gap="10px">
            <Center p="10px" borderRadius={"full"} borderWidth="1px">
              <SlSocialTwitter />
            </Center>
            <Center p="10px" borderRadius={"full"} borderWidth="1px">
              <TiSocialFacebook />
            </Center>
            <Center p="10px" borderRadius={"full"} borderWidth="1px">
              <TiSocialYoutube />
            </Center>
            <Center p="10px" borderRadius={"full"} borderWidth="1px">
              <TiSocialLinkedin />
            </Center>
            <Center p="10px" borderRadius={"full"} borderWidth="1px">
              <TiSocialTwitter />
            </Center>
          </Center>
        </Grid>
        <Grid fontFamily={"cursive"} gap="1rem" >
          <Link to="/terms" color="white">
            Terms and Conditions
          </Link>
          <Link to="/privacy" color="white">
            Privacy Policy
          </Link>
          <Link to="/contact" color="white">
            Contact Us
          </Link>
        </Grid>
      </Grid>
      <Center p="1rem" fontFamily={"heading"} color="white" >Copyright © {new Date().getFullYear()} GearHub</Center>
    </Box>

  );
}

export default Footer;
