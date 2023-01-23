import React from 'react'
import AccordionMenu from './AccordionMenu'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Button,
    Flex,
    Heading,
    Center,
    Box
} from '@chakra-ui/react'

import { TbDashboard } from "react-icons/tb"
import { GiOilDrum } from "react-icons/gi"
import { CgProfile } from "react-icons/cg"
import { BsChatDots } from "react-icons/bs"
import { SiGoogleanalytics } from "react-icons/si"
import { AiFillSetting } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { CloseIcon } from '@chakra-ui/icons'

const catlog = [{ name: "Product List", link: "/admin/product-list" }, { name: "Product", link: "/admin/product" }, { name: "Catogery", link: "/catogery" }];
const customer = [{ name: "Customer List", link: "/admin/customer-list" }, { name: "Customer", link: "/admin/customer" }]
function DrawerLeft({ disclosure, btnRef }) {
    const { isOpen, onOpen, onClose } = disclosure


    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent >
                    {/* <DrawerCloseButton /> */}
                    <DrawerHeader>
                        <Flex justifyContent={"space-around"} alignItems="center">
                            <Heading>Rahul</Heading>
                            <Center p="0 1rem" bg="gray.100" color="black">Admin</Center>
                            <CloseIcon _hover={{cursor:"pointer"}} boxSize={3} onClick={onClose} />
                        </Flex>
                    </DrawerHeader>

                    <DrawerBody bg="blackAlpha.700" pt="1rem" >

                        <Flex pl="1rem" pb="10px" alignItems={"center"} gap="15px" >
                            <TbDashboard color='white' />
                            <Box onClick={onClose} color="white" ><Link to="/admin">Dashboard</Link></Box>
                        </Flex>


                        {/* thest are custom components not related to chakra ui AccordionMenu */}
                        <AccordionMenu onClose={onClose} heading={[GiOilDrum, "Catlog"]} links={catlog} />
                        <AccordionMenu onClose={onClose} heading={[CgProfile, "Customer"]} links={customer} />

                        <Flex pl="1rem" pb="10px" alignItems={"center"} gap="15px" mt="7px" borderBottom={"1px solid white"} >
                            <BsChatDots color='white' />
                            <Box color="white" ><Link to="admin">Chat</Link></Box>
                        </Flex>
                        <Flex mt="7px" pl="1rem" pb="10px" alignItems={"center"} gap="15px" >
                            <SiGoogleanalytics color='white' />
                            <Box color="white" ><Link to="admin">Analytics</Link></Box>
                        </Flex>


                        <AccordionMenu heading={[AiFillSetting, "Setting"]} links={[]} />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
export default DrawerLeft