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
const Product = () => {
  return (
    <Box p={{ lg: "10rem 25%" }} pt="10rem" bg="gray.200">
      <Flex justifyContent={"space-between"} >
      <Heading mb="10px" >Add Product</Heading>
      <Button bg="yellow" p={"0 1.5rem"} >ADD</Button>

      </Flex>
      <Grid gap="1rem"  >
        <Box bg="gray.100" p="2rem"  >
          <FormLabel>Product Name</FormLabel>
          {/* <Input zIndex={'-1'}  color="gray.900" fontWeight={"400"} variant={"unstyled"} border="1px solid gray" p="8px 12px" type='text' /> */}
          <input style={style} type="text" />
        </Box>


        <Box bg="gray.100" p="2rem">
          <FormLabel>Description</FormLabel>
          {/* <Input color="gray.900" fontWeight={"400"} variant={"unstyled"} border="1px solid gray" p="8px 12px" type='text' /> */}
          <input style={style} type="text" />

        </Box>

        <Box bg="gray.100" p="2rem">
          <FormLabel>Price</FormLabel>
          {/* <Input color="gray.900" fontWeight={"400"} variant={"unstyled"} border="1px solid gray" p="8px 12px" type='number' /> */}
          <input style={style} type="number" />

        </Box>

        <Box bg="gray.100" p="2rem">
          <FormLabel>Image</FormLabel>
          {/* <Input color="gray.900" fontWeight={"400"} variant={"unstyled"} border="1px solid gray" p="8px 12px" type='text' /> */}
          <input style={style} type="text" />

        </Box>

        <Box bg="gray.100" p="2rem">
          <FormLabel>Category</FormLabel>
          <Select variant={'flushed'} placeholder='Select option'>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
        </Box>
      </Grid>
    </Box>
  )
}

export default Product