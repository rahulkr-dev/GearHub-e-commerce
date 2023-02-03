import { Box, Text,Button,Grid } from "@chakra-ui/react";
import { GrAid } from "react-icons/gr";
import {Link} from "react-router-dom"
const NotFound = () => {
  return (
    <Grid
      alignItems="center"
      justifyContent="center"
      gap="1rem"
      mt="3rem"

    >
      <Text fontSize="4xl" fontWeight="medium" color="gray.500">
        404
      </Text>
      <Text fontSize="xl" color="gray.500">
        Page Not Found
      </Text>
      <Text>You just hit a route that doesn't exist... the sadness.</Text>
      <Link to="/" mt={4}>
        <Button p="10px 16px" colorScheme={"cyan"}>Go back to the homepage</Button>
      </Link>
    </Grid>
  );
};

export default NotFound