import React, { useRef } from "react";
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
    Center
} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    return (
        <>
            <Box p="10px" w="100%" position={"fixed"} bg="gray.200">
                <Flex fontSize={"1.2rem"} justifyContent="space-around" alignItems="center" fontWeight={"bold"} fontFamily="cursive" >
                    <Flex w="full" display={{base:"none",md:"none",lg:"flex"}} gap="2rem" justifyContent={"center"} alignItems="center" >
                        <CLink as={Link} to="/" color="black">
                            Home
                        </CLink>
                        <CLink as={Link} to="/products" color="black">
                            products
                        </CLink>
                        <CLink as={Link} to="/cart" color="black">
                            cart
                        </CLink>
                        <CLink as={Link} to="/admin" color="black">
                            Dahboard
                        </CLink>
                    </Flex>
                    <Flex w="full" display={{ base:"flex",md:"flex",lg:"none" }}
                        gap="1rem"
                        pr="1rem"
                        justifyContent={"flex-end"}
                    >
                        <Box>Rahul</Box>
                        <Center

                            ref={btnRef}
                            onClick={onOpen}
                            _hover={{ cursor: "pointer" }}
                        >
                            <HamburgerIcon />
                        </Center>

                    </Flex>


                    {/* For smaller Screen */}

                    <Drawer
                        placement="right"
                        onClose={onClose}
                        isOpen={isOpen}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader>Menu</DrawerHeader>
                            <DrawerBody>
                                <CLink as={Link} to="/admin" color="black">
                                    Dahboard
                                </CLink>
                                <CLink as={Link} to="/" color="black" onClick={onClose}>
                                    Home
                                </CLink>
                                <CLink as={Link} to="/products" color="black" onClick={onClose}>
                                    products
                                </CLink>
                                <CLink as={Link} to="/cart" color="black" onClick={onClose}>
                                    cart
                                </CLink>
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
