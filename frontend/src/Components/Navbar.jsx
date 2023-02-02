import React, { useRef, useState, useEffect } from "react";
import {
    Box,
    Flex,
    Link as CLink,
    useDisclosure,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Center, Text, InputGroup, InputLeftElement, Input, DrawerCloseButton, Grid
} from "@chakra-ui/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { useSelector } from 'react-redux';
import UserProfile from "./UserProfile";
import { HiShoppingCart } from "react-icons/hi"


function Navbar() {
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const { auth, role } = useSelector(store => store.auth);
    const currentPath = location.pathname;
    let adminPath = currentPath.includes('/admin');


    return (
        <>
            <Box p="10px" w="100%" position={"fixed"} zIndex={2}
                bg="#007dbc"
                color="#fff" >
                <Flex gap="2rem" fontSize={"1rem"} justifyContent="space-evenly" alignItems="center" fontWeight={"600"} fontFamily={"heading"} >
                    <Text><Link to="/">GearHub</Link></Text>
                    {/* display in bigger secreen */}
                    <Flex display={{ base: "none", md: "none", lg: "flex" }} gap="2rem" justifyContent={"center"} alignItems="center" >
                        <CLink as={Link} to="/men">
                            Men
                        </CLink>
                        <CLink as={Link} to="/women">
                            Women
                        </CLink>
                        <CLink as={Link} to="/kids">
                            Kids
                        </CLink>
                        <CLink as={Link} to="/accessories">
                            Assessories
                        </CLink>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<SearchIcon color='gray.500' />}
                            />
                            <Input color="gray.700" w="max-content" bg="gray.100" p="6px 3rem" outline="none" variant='unstyled' type='search' placeholder='Search' />
                        </InputGroup>
                    </Flex>
                    {/* role base access in frontend and also our all admin route procted by backend */}
                    {
                        role === "admin" && <CLink as={Link} to="/admin">
                            Dahboard
                        </CLink>
                    }
                    {
                        !adminPath && <Flex gap="2rem" >
                            {auth ? <Grid borderRadius={"md"} justifyContent={'center'} alignItems="center" >
                                <UserProfile />
                            </Grid> : <Box
                                >
                                <Link to="/auth/login">Login</Link>

                            </Box>
                            }
                            <Box>
                                <Link to="/cart">
                                    <Grid  borderRadius={"md"} justifyContent={'center'} alignItems="center">
                                        <Center fontSize="3xl" color="white" w="full"><HiShoppingCart /></Center>
                                    </Grid>
                                </Link>
                            </Box>
                        </Flex>
                    }


                    {/* for smaller screen hamburger icon */}
                    <Flex display={{ base: "flex", md: "flex", lg: "none" }}
                        gap="1rem"
                        pr="1rem"
                        justifyContent={"flex-end"}
                    >
                        <Center
                            ref={btnRef}
                            onClick={onOpen}
                            _hover={{ cursor: "pointer" }}
                        >
                            <HamburgerIcon />
                        </Center>

                    </Flex>

                    {/* drawer for smaller screen */}
                    <Drawer
                        placement="right"
                        onClose={onClose}
                        isOpen={isOpen}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent color="white"
                            bg="radial-gradient(circle, rgba(3,8,11,0.9640231092436975) 0%, rgba(8,13,13,1) 0%, rgba(1,14,17,0.8547794117647058) 0%, rgba(4,5,10,0.958420868347339) 0%)" >

                            <DrawerCloseButton />
                            <DrawerHeader>Menu</DrawerHeader>
                            <DrawerBody display="grid" >
                                <Grid h="10rem" >
                                    <Box  >
                                        <Link to="/men">Men</Link>
                                    </Box>
                                    <Box>
                                        <Link to="/women">Women</Link>
                                    </Box>
                                    <Box>
                                        <Link to="/kids">Kids</Link>
                                    </Box>
                                    <Box >
                                        <Link to="/accessories">Asscessories</Link>
                                    </Box>
                                </Grid>

                            </DrawerBody>
                            <DrawerFooter>
                                <IconButton icon="close" onClick={onClose} mr="auto" />
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </Flex>
            </Box>
            <Outlet />
        </>
    );
}

export default Navbar;
