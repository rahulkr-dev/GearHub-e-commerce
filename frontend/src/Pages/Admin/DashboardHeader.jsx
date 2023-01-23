import React from 'react'
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, Center, Flex, Input, InputGroup, InputLeftElement, useDisclosure } from '@chakra-ui/react'
import DrawerLeft from '../../Components/Admin/DrawerLeft'
import AdminRoutes from './AdminRoutes'
import { Outlet } from 'react-router-dom'

const DashboardHeader = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    return (
        <>
       
        <Box>
            {/* this is drawer componetn custom we are passing some props  DrawerLeft */}
            <DrawerLeft disclosure={{ isOpen, onOpen, onClose }} btnRef={btnRef} />

            <Flex w="100%" bg="#fff" position={"fixed"} top="3rem" boxShadow={'md'} justifyContent={"space-between"} p="6px 2rem" >
                <Flex alignItems={"center"} gap="1rem">
                    <Center _hover={{ cursor: "pointer" }} ref={btnRef} onClick={onOpen}>
                        <HamburgerIcon />
                    </Center>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.300' />}
                        />
                        <Input variant={"unstyled"} bg="gray.100" p="5px 2.3rem" type='tel' placeholder='Search' />
                    </InputGroup>
                </Flex>
                <Flex>
                    <Center pl="10px">
                        Profile
                    </Center>
                </Flex>
            </Flex>
            {/* DashboardHeader Logic */}
            {/* <Box bg="gray.200" pt="3rem" >
                <Box w={{ lg: "75%" }} bg="green" p={["full 70% 60%"]} m="auto" h="100vh">
                    <AdminRoutes />
                </Box>
            </Box> */}
        </Box>
        <Outlet />
        </>
    )
}

export default DashboardHeader