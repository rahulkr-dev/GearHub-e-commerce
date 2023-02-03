import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  useToast, Text, Heading
} from "@chakra-ui/react";
import { Navigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { singupRequest } from "../Redux/auth/auth.action";
import Loader from "../Components/Loader";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, signIn } = useSelector(state => state.auth)
  const toast = useToast()

  // console.log(auth,loading,error)

  useEffect(() => {
    if (error == "Request failed with status code 409") {
      showToast('warning', "User Exits , try login.")
    }
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();
    // perform signup logic
    const userData = {
      name, email, password
    }
    dispatch(singupRequest(userData))
    // console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
    setName("");
    setEmail("");
    setPassword("");
  }
  //  for showing toast
  function showToast(status, desc) {
    toast({
      title: `${status}`,
      status: status,
      description: desc,
      position: 'top',
      isClosable: true,
    })
  }


  if (signIn) {
    return <Navigate to="/auth/login" />
  }
  return (
    <Box w={["90%", "70%", "40%"]} m="auto" mt="2rem" p={"3rem"} shadow="md" rounded="lg"
    bg="linear-gradient(90deg, rgba(5,5,5,1) 0%, rgba(2,0,36,1) 34%, rgba(9,21,60,0.9640231092436975) 100%)"
    color="white" fontFamily={'cursive'}
    >
      <Heading color="#dfe7e7" >Sign Up</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mt="10px" >
          <FormLabel  htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            type="text"
            variant={"unstyled"}
            p="10px 1rem"
            bg="transparent"
            border="2px solid #686a6a"
           
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl mt="1rem">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            value={email}
            variant={"unstyled"}
            p="10px 1rem"
            bg="transparent"
            border="2px solid #686a6a"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mt="1rem">
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            variant={"unstyled"}
            p="10px 1rem"
            bg="transparent"
            border="2px solid #686a6a"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Text mt="1rem" color="#dfe7e7" fontWeight={"normal"} >Already have an account  <Text pl="3px" _hover={{textDecoration:"underline"}}  fontWeight={"bold"} as="span" color="blue.300" ><Link to="/auth/login" >login</Link></Text></Text>

        <Button w="full" type="submit" colorScheme="teal" mt={4}>
          Signup
          {loading && <Loader />}
        </Button>
      </form>
    </Box>
  );
}

export default Signup;
