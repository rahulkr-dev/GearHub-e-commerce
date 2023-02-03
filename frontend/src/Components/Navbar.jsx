import React, { useRef, useState, useEffect } from "react";
import {
    Box, Flex,Link as CLink,useDisclosure,IconButton, Drawer, DrawerBody, DrawerFooter, DrawerHeader,DrawerOverlay, DrawerContent,Center, Text, InputGroup, InputLeftElement, Input, DrawerCloseButton, Grid, VStack,Image
} from "@chakra-ui/react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { useSelector } from 'react-redux';
import UserProfile from "./UserProfile";
import { HiShoppingCart } from "react-icons/hi"
import axios from "axios";
import { production_url,development_url } from "../Utils/urlLinks";
let url =`${production_url}/api/product`

// let url = `http://localhost:8080/api/product`
function Navbar() {
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [search,setSearch] = useState('');
    const [searchData,setSearchData] = useState([]);
    const searchRef = useRef();

    const btnRef = useRef();
    const { auth, role } = useSelector(store => store.auth);
    const currentPath = location.pathname;
    let adminPath = currentPath.includes('/admin');

    useEffect(()=>{
        if(search){
            searchRef.current = setTimeout(()=>{
                getSearch()
            },1000)
        }else{
            setSearchData([])
        }
        
        return ()=>{
            clearTimeout(searchRef.current)
        }
    },[search])

    const getSearch = async()=>{
        if(!search);
        try{
            let res = await axios.get(`${url}/search?q=${search}`);
            setSearchData(res.data)

        }catch(err){
            console.log(err.message)
        }
    }
    // handle when clicking on search items
    const handleClickSearchItem = ()=>{
        setSearchData([]);
        setSearch("")
    }


    return (
        <>
            <Box p="10px" w="100%" position={"fixed"} zIndex={2}
                bg="#007dbc"
                color="#fff" >
                <Flex gap="2rem" fontSize={"1rem"} justifyContent="space-evenly" alignItems="center" fontWeight={"600"} fontFamily={"heading"} >
                    <Box m="-5px" ><Link to="/">
                        <Image borderWidth={"2px"} boxSize="3rem" src="/logo.png" />
                        </Link></Box>
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
                            {/* Search Box */}
                            <Box>
                                <Input 
                                onChange={(e)=>setSearch(e.target.value)} value={search}
                                color="gray.700" w="max-content" bg="gray.100" p="6px 3rem" outline="none" variant='unstyled' type='search' placeholder='Search' />
                                {/* search list */}
                                <VStack top="2.7rem" color="black"  bg="gray.200" position={"absolute"} maxH="60vh" overflowY={"scroll"}>
                                    {searchData.map((item,i)=>(
                                        <Flex onClick={handleClickSearchItem} w="full" _hover={{bg:"gray.300"}} key={item._id} fontFamily={"monospace"} mt="10px" alignItems={"center"} p="10px" >
                                            <Image src={item.image_urls[0]} boxSize="2rem" borderRadius={"full"} />
                                            <Link to={`/product/${item._id}`}><Text color="gray" fontSize="13px" >{item.name}</Text></Link>
                                        </Flex>
                                    ))}
                                </VStack>
                            </Box>
                        </InputGroup>
                    </Flex>
                    {/* role base access in frontend and also our all admin route procted by backend */}
                    {
                        role === "admin" && <CLink fontSize={"1.2rem"} color="gray.200" fontFamily={"monospace"} as={Link} to="/admin">
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
                                    <Grid borderRadius={"md"} justifyContent={'center'} alignItems="center">
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
