import React,{useState,useEffect} from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,Box,useToast
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {Navigate} from "react-router-dom"
import Loader from "../Components/Loader";
import { loginRequest } from "../Redux/auth/auth.action";



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const {loading,error,signIn,auth} = useSelector(state=>state.auth)
    const toast = useToast()

    useEffect(()=>{
        if(signIn){
          showToast('success',"We've created your account for you.")
        }
        return ()=>{
            showToast('success',"Login successfully")
        }
      },[])

      useEffect(()=>{
        console.log(error)
        if(error=='Request failed with status code 404'){
            showToast('error','Invalid credentials, Please try again.')
        }
      },[error])

    const handleSubmit = (e) => {
        e.preventDefault();
        // perform Login logic
        dispatch(loginRequest({email,password}))
        setEmail("");
        setPassword("");
    }
    // for showing toast
    function showToast(status,desc){
        toast({
          title: `${status}`,
          status: status,
          description:desc,
          position: 'top',
          isClosable: true,
        })
      }

      if(auth){
        return <Navigate to="/" />
      }
    return (
        <Box w={["90%","70%","50%"]} m="auto" p={5} shadow="md" rounded="lg">
            <form onSubmit={handleSubmit}>
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
                    Login
                    {loading && <Loader />}
                </Button>
            </form>
        </Box>
    );
}

export default Login;
