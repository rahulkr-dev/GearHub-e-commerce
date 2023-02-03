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
import {Link} from "react-router-dom"

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
          <Box fontSize={"3xl"} color="#fff">
            <CgProfile />

          </Box>
        </MenuButton>
        <MenuList color="black" >
          <MenuItem >
            <Image
              borderRadius='full'
              boxSize='50px'
              src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png'
              alt='Dan Abramov'
            />
          </MenuItem>
          <MenuItem>Rahul kumar</MenuItem>
          <MenuItem>rkrahul8181@gmail.com</MenuItem>
          <MenuItem>
            <Link to="/order-list">Orders</Link>
          </MenuItem>
          <MenuItem>Edit</MenuItem>
          <MenuItem onClick={handleLogout} >Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default UserProfile