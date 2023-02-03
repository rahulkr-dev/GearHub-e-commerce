import React, { useState, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button, Box, useToast, Text, Heading, Flex, Center
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom"
import Loader from "../Components/Loader";
import { loginRequest } from "../Redux/auth/auth.action";



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const { loading, error, signIn, auth } = useSelector(state => state.auth)
    const toast = useToast()

    useEffect(() => {
        if (signIn) {
            showToast('success', "We've created your account for you.")
        }
        // return ()=>{
        //     showToast('success',"Login successfully")
        // }
    }, [signIn])

    useEffect(() => {
        console.log("error handle", error)
        if (error) {
            console.log('its working')
            showToast('error', 'Invalid credentials, Please try again.')
        }
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // perform Login logic
        dispatch(loginRequest({ email, password }))
        setEmail("");
        setPassword("");
    }
    // for showing toast
    function showToast(status, desc) {
        toast({
            title: `${status}`,
            status: status,
            description: desc,
            position: 'top',
            isClosable: true,
        })
    }

    if (auth) {
        return <Navigate to="/" />
    }
    return (
        <Box w={["90%", "70%", "40%"]} m="auto" mt="2rem" p={"3rem"} shadow="md" rounded="lg"
            bg="linear-gradient(90deg, rgba(5,5,5,1) 0%, rgba(2,0,36,1) 34%, rgba(9,21,60,0.9640231092436975) 100%)"
            color="white" fontFamily={'cursive'}>
            <form onSubmit={handleSubmit}>
                <Heading color="#dfe7e7" >Login</Heading>
                <FormControl mt="10px">
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
                <FormControl mt="10px">
                    <Flex justifyContent={"space-between"} >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Text color="red.500" ><Link to="/auth/forget">forget password</Link></Text>
                    </Flex>
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
                <Text mt="1rem">Don't have an account  <Text pl="3px" _hover={{ textDecoration: "underline" }} as="span" color="blue.300" ><Link to="/auth/signup" >signup</Link></Text></Text>
                <Button color="#dfe7e7" w="full" type="submit" colorScheme="teal" mt={4}>
                    Login
                    {loading && <Loader />}
                </Button>
                <Center m="1rem 0">OR</Center>
                <Button color="#dfe7e7" w="full" colorScheme={"red"} >Login with Google</Button>
            </form>
        </Box>
    );
}

export default Login;
