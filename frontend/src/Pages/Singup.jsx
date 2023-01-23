import React,{useState,useEffect} from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    useToast
  } from "@chakra-ui/react";
  import {Navigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { singupRequest } from "../Redux/auth/auth.action";
import Loader from "../Components/Loader";
  
  function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {loading,error,signIn} = useSelector(state=>state.auth)
    const toast = useToast()

    // console.log(auth,loading,error)

    useEffect(()=>{
      if(error=="Request failed with status code 409"){
        showToast('warning',"Already exits user")
      }
    },[error])

    const handleSubmit = (e) => {
      e.preventDefault();
      // perform signup logic
      const userData = {
        name,email,password
      }
      dispatch(singupRequest(userData))
      // console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
      setName("");
      setEmail("");
      setPassword("");
    }
  //  for showing toast
    function showToast(status,desc){
      toast({
        title: `${status}`,
        status: status,
        description:desc,
        position: 'top',
        isClosable: true,
      })
    }
 

    if(signIn){
      return <Navigate to="/auth/login" />
    }
    return (
        <Box w={["90%","70%","50%"]} m="auto" mt="2rem" p={5} shadow="md" rounded="lg">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>
          Signup
          {loading && <Loader />}
        </Button>
      </form>
      </Box>
    );
  }
  
  export default Signup;
  