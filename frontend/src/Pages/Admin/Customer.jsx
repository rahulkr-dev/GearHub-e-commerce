import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Grid,Flex,FormLabel,Heading,useToast} from '@chakra-ui/react'

const style = {color:"gray",border:"1px solid gray",padding:"8px 12px",fontWeight:"500",width:"100%",outline:"none",background:"transparent"}
const btnStyle = { borderRadius: "6px", background: "#555555", color: "white", fontWeight: 'bold', border: "1px solid gray", padding: "5px 12px", width: "max-content", margin: "5px 0" }

const init = {
  name:"",
  email:"",
  password:"",
  role:""
}
const Customer = () => {
  const [user,setUser] = useState(init);
  const toast = useToast();
  const dispatch = useDispatch();
  const store = useSelector(store => store);
 

  useEffect(()=>{

  },[])
  
  const handleChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  const submitUser = ()=>{
    console.log(user)
  }
  return (
    <Box p={{base:"15px",lg: "10rem 25%" }} pt="10rem" bg="gray.200">
    <Flex justifyContent={"space-between"} >
    <Heading mb="10px" >Add User</Heading>
    <button onClick={submitUser} style={btnStyle} bg="yellow" p={"0 1.5rem"} >ADD</button>

    </Flex>
    <Grid gap="1rem"  >
      <Box bg="gray.100" p="2rem"  >
        <FormLabel>User Name</FormLabel>
        <input name='name' value={user.name} onChange={handleChange} style={style} type="text" />
      </Box>

      <Box bg="gray.100" p="2rem">
        <FormLabel>Email</FormLabel>
        <input name='email' value={user.email} onChange={handleChange} style={style} type="text" />
      </Box>

      <Box bg="gray.100" p="2rem">
        <FormLabel>Password</FormLabel>
        <input name='password' value={user.password} onChange={handleChange} style={style} type="password" />

      </Box>


      <Box bg="gray.100" p="2rem">
        <FormLabel>Role</FormLabel>
        <select name='role' value={user.role} onChange={handleChange} style={style} placeholder='Select role'>
          <option value="">select role</option>
          <option value='admin'>Admin</option>
          <option value='customer'>Customer</option>
        </select>
      </Box>
    </Grid>
  </Box>
  )
}

export default Customer