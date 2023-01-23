import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Flex bg="gray.800" p={4} justifyContent="space-between" color="white">
      <Text>Copyright © {new Date().getFullYear()} My E-commerce</Text>
      <Flex fontFamily={"cursive"} gap="1rem" >
        <Link to="/terms" color="white">
          Terms and Conditions
        </Link>
        <Link to="/privacy" color="white">
          Privacy Policy
        </Link>
        <Link to="/contact" color="white">
          Contact Us
        </Link>
      </Flex>
    </Flex>
  );
}

export default Footer;
