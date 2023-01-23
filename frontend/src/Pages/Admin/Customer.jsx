import {
  Box, Grid, Input,Button,Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Heading,
} from '@chakra-ui/react'
import React from 'react'
const style = {color:"gray",border:"1px solid gray",padding:"8px 12px",fontWeight:"500",width:"100%",outline:"none",background:"transparent"}

const Customer = () => {
  return (
    <Box p={{ lg: "10rem 25%" }} pt="10rem" bg="gray.200">
    <Flex justifyContent={"space-between"} >
    <Heading mb="10px" >Add User</Heading>
    <Button bg="yellow" p={"0 1.5rem"} >ADD</Button>

    </Flex>
    <Grid gap="1rem"  >
      <Box bg="gray.100" p="2rem"  >
        <FormLabel>User Name</FormLabel>
        <input style={style} type="text" />
      </Box>

      <Box bg="gray.100" p="2rem">
        <FormLabel>Email</FormLabel>
        <input style={style} type="text" />
      </Box>

      <Box bg="gray.100" p="2rem">
        <FormLabel>Password</FormLabel>
        <input style={style} type="password" />

      </Box>


      <Box bg="gray.100" p="2rem">
        <FormLabel>Role</FormLabel>
        <Select variant={'flushed'} placeholder='Select role'>
          <option value='option1'>Admin</option>
          <option value='option2'>Customer</option>
        </Select>
      </Box>
    </Grid>
  </Box>
  )
}

export default Customer