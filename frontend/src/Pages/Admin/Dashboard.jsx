import React from 'react'
import { Center, Box, Grid, Heading,Text } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <Box p={{lg:"10rem 25%"}} pt="10rem" >
      <Grid gap="1.5rem" gridTemplateColumns={["repeat(1,1fr)","repeat(2,1fr)","repeat(3,1fr)"]} placeItems="center">
        <Center w="250px" bg="red.50" boxShadow="lg" p="3rem" >
          <Box>
            <Text>Total Product</Text>
            <Heading>50</Heading>
          </Box>
        </Center>
        <Center bg="red.50"w="250px" boxShadow="lg" p="3rem" >
          <Box>
            <Text>Total User</Text>
            <Heading>30</Heading>
          </Box>
        </Center>
        <Center bg="red.50" w="250px" boxShadow="lg" p="3rem" >
          <Box>
            <Text>Total Order</Text>
            <Heading>10</Heading>
          </Box>
        </Center>
      </Grid>
    </Box>
  )
}

export default Dashboard