import React from 'react'
import { Grid, Image, Flex, Text, Center, Button, Box } from '@chakra-ui/react'
import { AiTwotoneStar } from "react-icons/ai"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteCartItems, getCartData } from './../Redux/cart/cart.action';

const AddToCartItem = ({ product }) => {
    const [totalItem, setTotalItem] = useState(product.quantity);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error } = useSelector((store => store.cart))
    const { auth, token } = useSelector((store => store.auth))
    // console.log(product)
    const items = product.product
    const quantity = product.quantity;

    const handleInc = (id) => {
        const payload = {
            token: token,
            body: {
                productId: id,
                productQty: 1
            }
        }
        dispatch(addToCart(payload))
        // dispatch(getCartData({ token }))
        setTotalItem(totalItem + 1)
    }
    const handleDec = (id) => {
        const payload = {
            token: token,
            body: {
                productId: id,
                productQty: -1
            }
        }
        dispatch(addToCart(payload))
        // dispatch(getCartData({ token }))
        setTotalItem(totalItem - 1)
    }

    const handleDelteItem = (id) => {
        // console.log(id)
        const payload = {
            token: token,
            body: {
                productId: id
            }
        }
        dispatch(deleteCartItems(payload))

    }
    return (
        <>

            <Flex bg="#fff" justifyContent={"space-between"} alignItems={"center"} p="1rem">

                <Image
                    boxSize={"8rem"}
                    src={items.image_urls[0]} />

                <Grid gap=".6rem">
                    <Text fontSize={".9rem"}>{items.name}</Text>
                    <Flex gap="1rem">
                        <Center bg="gray.100" gap="10px" p="6px 12px" borderRadius={"md"}>
                            <Text fontWeight={"bold"}>4.5</Text>
                            <Text color="yellow.300">
                                <AiTwotoneStar />
                            </Text>
                        </Center>
                        <Center>
                            Size : <Text pl="3px" fontWeight={"bold"}> {items.size} </Text>
                        </Center>
                    </Flex>
                    {/* increment and decrement */}
                    <Flex gap="10px" p="8px 0" alignItems={"center"}>
                        <Text>Qty</Text>
                        <Button isDisabled={totalItem <= 1} onClick={() => handleDec(items._id)}>-</Button>
                        <Text borderRadius={"md"} fontWeight={"bold"} p="6px 12px" borderWidth="1px" >{totalItem}</Text>
                        <Button onClick={() => handleInc(items._id)}>+</Button>
                    </Flex>
                </Grid>
                <Grid h="100%">
                    {/* delete button */}
                    <Box>
                        <Center
                            onClick={() => handleDelteItem(items._id)}
                            _hover={{ cursor: "pointer" }}
                            m="auto" w="max-content" bg={"gray.100"} color="gray.600" p="6px 12px" borderRadius={'md'} fontSize={"1.5rem"}>
                            <RiDeleteBin6Line />
                        </Center>
                    </Box>
                    {/* price */}
                    <Center gap="1rem">
                        <Text as="del" color="gray.500" fontSize={".8rem"}> ₹ {Math.round(+items.price * 1.4)}</Text>
                        <Text fontSize={"1.1rem"} fontWeight="bold"> ₹ {items.price}</Text>
                    </Center>
                </Grid>
            </Flex>

        </>
    )
}

export default AddToCartItem