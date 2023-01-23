import React from "react";
import { Box, Text, Image, Flex, Button } from "@chakra-ui/react";

const UserProfile = ({ user }) => {
  return (
    <Box bg="gray.700" color="white" p={5}>
      <Flex align="center">
        <Image src={user.avatar} alt={user.name} size="75px" rounded="full" mr={5} />
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {user.name}
          </Text>
          <Text>{user.email}</Text>
        </Box>
      </Flex>
      <Flex mt={5}>
        <Button colorScheme="teal" mr={3}>
          Edit Profile
        </Button>
        <Button colorScheme="red">Logout</Button>
      </Flex>
    </Box>
  );
};

export default UserProfile