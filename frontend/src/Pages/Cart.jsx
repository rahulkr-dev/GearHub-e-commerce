import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Grid, Flex, Button, Image, Center, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input,useToast } from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getCartData } from "../Redux/cart/cart.action";
import AddToCartItem from "../Components/AddToCartItem";
import { GiReturnArrow } from "react-icons/gi"
import { TbTruckDelivery } from "react-icons/tb"
import { FaHandPointRight } from "react-icons/fa"
import Loader from './../Components/Loader';

const Cart = ({ cartItems }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, data, totalPrice, delivery_fee,totalQty } = useSelector((store => store.cart))
  const { auth, token } = useSelector((store => store.auth));
  // console.log(totalQty)
  useEffect(() => {
    dispatch(getCartData({ token }))
  }, [totalQty]);

  const handleCheckoutPage = ()=>{
    if(data.length<1){
      toast({
        title: `Your Cart Is Empty`,
        status: "error",
        isClosable: true,
        position:"top-right"
      })
    }else{
      navigate("/checkout")
    }
  }
  return (
    <>
 
    <Box opacity={loading?"0.3":"1"} bg="gray.200">
      <Box pt="6rem" w={["100%", "100%", "80%"]} m="auto">
        <Grid gap="1.5rem" gridTemplateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "repeat(1,1fr)", "60% 38%"]} >
          {/* cart items */}
          <Grid gap="1rem">
            {data.map((items, i) => (
              <AddToCartItem key={items._id} product={items} />
            ))}
          </Grid>
          {/* cart total */}

          <Grid h="max-content" fontFamily={"heading"} fontSize=".8rem">
            <Grid bg="#fff" gap="7px" borderBottomWidth={"1px"} p="1rem">
              <Text textAlign={"left"} fontSize={"1.2rem"} fontWeight="bold">Order Summary</Text>
              <Flex justifyContent={"space-between"} >
                <Text>{"Total products (Inc GST)"}</Text>
                <Text> ₹ {Math.round(totalPrice * 1.4)}</Text>
              </Flex>
              <Flex justifyContent={"space-between"} >
                <Text>Discount</Text>
                <Text color='green.300'> ₹ {Math.round(totalPrice * .4)}</Text>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Text>Estimated Delivery Fee</Text>
                <Center>
                  <Text as="del" color="gray">199</Text>
                  <Text > ₹ {delivery_fee}</Text>
                </Center>
              </Flex>
            </Grid>
            <Flex bg="#fff" p="1rem" justifyContent={"space-between"}>
              <Text fontSize={"1.2rem"} fontWeight="bold">Total</Text>
              <Text fontWeight={"bold"} fontSize="1rem"> ₹ {totalPrice + delivery_fee}</Text>
            </Flex>

            {/* checkout button */}
            <Button onClick={handleCheckoutPage} p="1rem" textTransform="uppercase" colorScheme={"facebook"} color="#fff" mt="1rem" bg="darkcyan">Procced To Checkout</Button>
            {/* info cards like free delivery warrenty etc */}

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
            {/* apply voucher code  */}

            <Box mt="1rem">
              <Button variant={"unstyled"} p="10px 20px" bg="#fff" boxShadow={"2xl"} borderRadius="md" w="full" onClick={onOpen}>APPLY VOUCHER CODE</Button>

              <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>APPLY VOUCHER CODE</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Center gap="8px" >
                      <Input variant={"unstyled"} p="10px 20px" bg="gray.200" placeholder="ENTER VOUCHER CODE" />
                      <Button
                        onClick={() =>
                          toast({
                            title: `Sorry This is not a valid VOUCHER`,
                            status: "error",
                            isClosable: true,
                            position:"top-right"
                          })
                        }
                        variant={"unstyled"} bg="gray.200" p="10px 15px" color="blue" >APPLY</Button>
                    </Center>
                  </ModalBody>

                  <ModalFooter>
                    <Text color="gray" textAlign={"left"} fontSize={".8rem"}>By applying a voucher code you agree to our <Text pl="3px" as="span" color="blue">Terms & Conditions</Text></Text>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>

          </Grid>
        </Grid>
      </Box>
    </Box>
    {loading && <Loader />}
    </>
  );
};
export default Cart