import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box, Text, Center, Flex, Grid, Input, Button, useDisclosure, FormControl } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress } from './../Redux/order/order.action';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const init = {
    house: "",
    street: "",
    landmark: "",
    pincode: "",
    city: "",
    phone: ""
}
const Checkout = () => {
    const toast = useToast();
    const navigate = useNavigate()
    const [userAdd, setUserAdd] = useState(init)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const { delivery_fee, totalPrice } = useSelector(store => store.cart)
    const { address } = useSelector(store => store.order);
    // console.log(address)

    const handleChange = (e) => {
        setUserAdd({ ...userAdd, [e.target.name]: e.target.value })
    }
    const handleAddressSubmit = () => {
        // console.log(userAdd)
        // dispatching user adddress 
        dispatch(addNewAddress({...userAdd}))
        setUserAdd(init)
        onClose()
    }

    const handleSecurePayment = (e)=>{
        if(!address.house){
            toast({
                title: `Add Address For The Delievry`,
                status: "error",
                isClosable: true,
                position:"top-right"
              })
        }else{
            navigate('/payment')
        }
    }
    return (
        <>
            <Box pt="6rem" pl="1rem" w={["95%", "85%", "75%", "60%"]} m="auto" bg="gray.200" h="100vh">
                {/* adding address */}
                <Box textAlign={"left"}>
                    <Button colorScheme={"messenger"} onClick={onOpen}>Add Address</Button>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader mb="1rem" bg="blue.100">Add New Address</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl>
                                    <Grid gap="15px">
                                        <Input onChange={handleChange} name="house" value={userAdd.house} placeholder="*house / flat / building / apartment" />
                                        <Input onChange={handleChange} name="street" value={userAdd.street} placeholder='*Street / locality' />
                                        <Input onChange={handleChange} name="landmark" value={userAdd.landmark} placeholder='Landmark' />
                                        <Flex>
                                            <Input onChange={handleChange} name="pincode" value={userAdd.pincode} placeholder="Pincode" />
                                            <Input onChange={handleChange} name="city" value={userAdd.city} placeholder="City" />
                                        </Flex>
                                        <Input onChange={handleChange} name="phone" value={userAdd.phone} placeholder='Phone Number' />
                                        <Button onClick={() => handleAddressSubmit()} w="full" colorScheme={'linkedin'} bg="blue.400">ADD ADDRESS</Button>
                                    </Grid>
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
                {/* mapping address */}
                {
                    address.city && <Grid color="gray" textAlign={"left"} mt="1rem" bg="#fff" 
                    p="1rem" justifyContent={"flex-start"} w="max-content"
                    borderRadius={"md"} fontFamily={"monospace"}>
                        <Text color="black" fontWeight={"bold"} fontSize="1.3rem">{"ADDRESS"}</Text>
                        <Text>{address.house}</Text>
                        <Text>{address.street}</Text>
                        <Text>{address.landmark}</Text>
                        <Text>{address.city} , {address.pincode}</Text>
                        <Text fontWeight={"bold"}> Phone : {address.phone}</Text>
                    </Grid>
                }
                <Flex bg='#fff' m="2rem 1rem 0 1rem" p="1rem" justifyContent={"space-between"}>
                <Text>Delivery fee</Text>
                <Text>{delivery_fee}</Text>
                </Flex>
                <Flex  bg="#fff" m="1rem 1rem 0 1rem" p="1rem" justifyContent={"space-between"}>
                    <Text>TOTAL</Text>
                    <Text>{totalPrice}</Text>
                    </Flex>
                <Box textAlign={"left"} >
                    <Button onClick={handleSecurePayment} m="1rem" colorScheme={"yellow"}>PROCEED TO SECURE PAYMENT</Button>
                </Box>

            </Box>
        </>
    )
}

export default Checkout