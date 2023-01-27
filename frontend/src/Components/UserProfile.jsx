import React from "react";
import { Box, Text, Image, Flex, Button } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { CgProfile } from "react-icons/cg"
import { useDispatch } from 'react-redux';
import { logoutRequest } from './../Redux/auth/auth.action';
const UserProfile = ({ role }) => {
  // console.log(role,'profile')
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutRequest())
  }
  return (
    <Box  >
      <Menu >
        <MenuButton >
          <CgProfile />
        </MenuButton>
        <MenuList color="black" >
          <MenuItem >
            <Image
              borderRadius='full'
              boxSize='50px'
              src='https://bit.ly/dan-abramov'
              alt='Dan Abramov'
            />
          </MenuItem>
          <MenuItem>Rahul kumar</MenuItem>
          <MenuItem>rkrahul8181@gmail.com</MenuItem>
          <MenuItem>Edit</MenuItem>
          <MenuItem onClick={handleLogout} >Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default UserProfile