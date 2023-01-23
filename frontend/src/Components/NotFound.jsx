import { Box, Text } from "@chakra-ui/react";
import {Link} from "react-router-dom"
const NotFound = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Text fontSize="4xl" fontWeight="medium" color="gray.500">
        404
      </Text>
      <Text fontSize="xl" color="gray.500">
        Page not found
      </Text>
      <Link to="/" mt={4}>
        Go back to the homepage
      </Link>
    </Box>
  );
};

export default NotFound