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
    DrawerContent
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    return (
        <Box bg="gray.800" p={4}>
            <Flex justifyContent="space-between" alignItems="center">
                <CLink as={Link} to="/" color="white">
                    Home
                </CLink>
                <CLink as={Link} to="/products" color="white">
                    products
                </CLink>
                <CLink as={Link} to="/cart" color="white">
                    cart
                </CLink>
                <IconButton
                    ref={btnRef}
                    icon="menu"
                    // variant="ghost"
                    onClick={onOpen}
                />
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
    );
}

export default Navbar;
