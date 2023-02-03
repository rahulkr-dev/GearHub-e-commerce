import React from 'react'
import { Box, Grid, Center, Flex, Text, Button, Heading,Image } from "@chakra-ui/react"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPlacedOrder } from '../Redux/order/order.action';
const OrderList = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(store => store.auth);
    const { totalOrderData } = useSelector(store => store.order);
    // console.log(totalOrderData)
    // const {address,items,total,status} = totalOrderData

    useEffect(() => {
        dispatch(getPlacedOrder(token))
    }, [])
    return (
        <>
            <Box p="1rem" pt="5rem" bg="gray.200">
                <Heading>Your Orders</Heading>
                {totalOrderData.map((item, i) => (
                    <Grid borderRadius={"md"} borderWidth="2px" key={item._id} bg="#fff" p="1rem" justifyContent={"center"} w="max-content" shadow={"md"} gap="10px">
                        {item.items.map((insideItem, i) => (
                            <Flex key={i}>
                                <Image borderRadius={"full"} boxSize={"3rem"} src={insideItem.product.image_urls[0]} />
                                <Grid fontFamily={"monospace"} justifyContent="flex-start">
                                    <Text>{insideItem.product.name}</Text>
                                    <Text fontWeight={"bold"} fontSize="1rem">Price: <Text pl="5px" as={"span"}>{insideItem.product.price}</Text></Text>
                                    <Text fontWeight={"bold"} fontSize="1rem">Brand: <Text pl="5px" as={"span"}>{insideItem.product.brand}</Text></Text>
                                </Grid>
                            </Flex>
                        ))}
                        <Text textAlign={"left"}>Status: <Text textTransform={"capitalize"} as="span" color={item.status=="pending"?"green":"red"} pl="5px">{item.status}</Text></Text>
                        <Grid>
                            <Text>{item.address}</Text>
                        </Grid>
                    </Grid>
                ))}
            </Box>

        </>
    )
}

export default OrderList