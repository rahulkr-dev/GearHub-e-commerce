import React from 'react'
import { Box, Flex, Text, Grid, Center, Button, Alert, AlertIcon, AlertTitle, AlertDescription, } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { GiReturnArrow } from "react-icons/gi"
import { TbTruckDelivery } from "react-icons/tb"
import { FaHandPointRight } from "react-icons/fa"
import Loader from './../Components/Loader';
import { orderPlaced, placeOrderReset } from '../Redux/order/order.action';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Payment = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { address, loading, orderPlace } = useSelector(store => store.order)
    const { token } = useSelector(store => store.auth)
    const { delivery_fee, totalPrice, data } = useSelector(store => store.cart);

    useEffect(() => {
        if (orderPlace == true) {
            toast({
                title: `Your Order being Placed Successfully`,
                status: "success",
                isClosable: true,
                position: "top-right"
            })

            dispatch(placeOrderReset());
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [orderPlace])

    const getDeliveryDate = () => {
        let today = new Date();
        let tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow = tomorrow.toString(tomorrow)
        let clipDate = tomorrow.split(' ');
        tomorrow = clipDate[0] + ' ' + clipDate[1] + " " + clipDate[2] + " " + clipDate[3]
        return tomorrow
    }

    const handleOrder = () => {
        // dispatching order api
        console.log('handle order works ')
        let items = data.map((item) => (
            {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            }
        )
        )

        const payload = {
            token,
            data: {
                address: `${address.house}  ${address.street} ${address.pincode} ${address.city}`,
                items,
                total: totalPrice,
            }
        }
        dispatch(orderPlaced(payload))
    }

    return (
        <>
            <Box bg="gray.300" p={["1rem", "2rem", "3rem", "5rem"]} pt="5rem" >
                <Grid fontFamily={"monospace"} borderRadius={"md"} mt="4rem" justifyContent={"flex-start"} bg="#fff" p="1rem">
                    <Text color={"green"} textAlign={"left"}>Delivering to Home <Text color="black" fontWeight={"bold"} as="span"> {address.pincode} {address.city}</Text></Text>
                    <Text>Standard Home Delivery By Tomorrow  <Text color="black" fontWeight={"bold"} as="span"> {getDeliveryDate()}</Text></Text>
                </Grid>
                <Box>
                    <Grid templateColumns={["70%", "40% 60%"]} gap="10px" m="auto" mt="1rem" boxShadow={"md"} >
                        <Grid gap="10px">
                            <Flex cursor={"not-allowed"} flexDirection={"column"} bg="gray.100" p="1rem" borderRadius={"md"}>
                                <Text fontWeight={"bold"} color="black">UPI</Text>
                                <Text color="gray">Instant Payment using UPI app</Text>
                            </Flex>
                            <Flex cursor={"not-allowed"} flexDirection={"column"} bg="gray.100" p="1rem" borderRadius={"md"}>
                                <Text fontWeight={"bold"} color="black">DEBIT/CREDIT CARDS</Text>
                                <Text color="gray">Visa Master card Rupay and more</Text>
                            </Flex>
                            <Flex cursor={"not-allowed"} flexDirection={"column"} bg="gray.100" p="1rem" borderRadius={"md"}>
                                <Text fontWeight={"bold"} color="black">NETBANKING</Text>
                                <Text color="gray">ALL Indian Banks</Text>
                            </Flex>
                            {/* cash on delivery */}
                            <Button onClick={handleOrder} _hover={{ cursor: "pointer" }} bg="yellow" p="1rem" fontWeight={"bold"}>
                                CASH ON DELIVERY
                            </Button>
                        </Grid>
                        <Grid>
                            <Alert
                                status='error'
                                variant='subtle'
                                flexDirection='column'
                                alignItems='center'
                                justifyContent='center'
                                textAlign='center'
                                height='200px'
                            >
                                <AlertIcon boxSize='40px' mr={0} />
                                <AlertTitle mt={4} mb={1} fontSize='lg' textTransform={"uppercase"}>
                                    Sorry for the inconvient!
                                </AlertTitle>
                                <AlertDescription maxWidth='sm' textTransform={"capitalize"}>
                                    Due to some technical issue, we are only acepting cash on delivery right know.
                                </AlertDescription>
                            </Alert>
                            {/* for informative cards */}
                            <Grid mt="1rem" color={"darkcyan"} templateColumns={"repeat(3,1fr)"} gap="1rem" fontFamily={"monospace"} fontWeight={"bold"}>
                                <Grid borderRadius={"md"} gap="10px" bg="white" boxShadow={"lg"} justifyContent="center" alignItems={"center"} p="1.6rem 0">
                                    <Center fontSize={"3xl"} ><GiReturnArrow /></Center>
                                    <Text>Easy returns</Text>
                                </Grid>
                                <Grid borderRadius={"md"} gap="10px" bg="white" boxShadow={"lg"} justifyContent="center" alignItems={"center"} p="1.6rem 0">
                                    <Center fontSize={"3xl"}>
                                        <TbTruckDelivery />
                                    </Center>
                                    <Text w="full">Home Delivery at Your Doorstep</Text>
                                </Grid>
                                <Grid borderRadius={"md"} gap="10px" bg="white" boxShadow={"lg"} justifyContent="center" alignItems={"center"} p="1.6rem 0">
                                    <Center fontSize={"3xl"}>
                                        <FaHandPointRight />
                                    </Center>
                                    <Text>Minimum 2 years warranty</Text>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

            </Box>
        </>
    )
}

export default Payment