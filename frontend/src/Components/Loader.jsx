import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box
      width="100%"
      height="100%"
      position={"absolute"}
      top="50%"
      bottom="50%"
      transform={"transition(-50%,-50%)"}
    >
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Box>
  );
};

export default Loader;