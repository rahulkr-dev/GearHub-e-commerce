import React, { useState } from "react"
import { Box, Image, Text, Flex, Button, Center } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../Redux/cart/cart.action";
import Loader from "./Loader";

const CardItem = ({ product }) => {
  const [image, setImage] = useState(product.image_urls[0]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading,error} = useSelector((store=>store.cart))
  const {auth,token} = useSelector((store=>store.auth));
  // console.log(auth)

  const handleAddToCart = (item)=>{
    if(!auth){
      return navigate("/auth/login")
    }
    // console.log(item)
    const payload = {
      token:token,
      body:{
        productId:item._id,
        productQty:1
      }
    }
    dispatch(addToCart(payload))
  }
  return (
    <Box maxW="225px" borderWidth="1px" rounded="lg" overflow="hidden" p="10px">
      <Box>
        <Image src={image} alt={product.name} objectFit="cover" h="200px" />
      </Box>
      <Flex mt="1rem" w="full" justifyContent={"flex-end"} pr="1rem" gap="2px" >
        {product.image_urls.map((item, i) => (
          <Image onClick={() => setImage(item)} key={i} src={item} objectFit="cover" h="2rem" />
        ))
        }
      </Flex>
      <Box pt="10px" textAlign={"left"}>
        <Text fontWeight="bold" fontSize="lg" textTransform={"uppercase"}>
          {product.brand}
        </Text>
        <Text m="10px 0" w="100%" h="1rem" overflow={"hidden"} textOverflow="ellipsis" color="gray" textTransform={"uppercase"} fontSize={"14px"}>
          {product.name}
        </Text>
        <Flex justifyContent={"flex-start"} alignItems="center" w="full" >
          <Center w="40%" p="6px 0" bg="yellow" color="black" fontWeight={"bold"}> ₹ {product.price}</Center>
          <Text pl="1rem" color="gray.500" as={"del"}> ₹ {Math.round(+product.price * 1.45)}</Text>
        </Flex>
        <Flex mt="auto">
          <Link to={`/product/${product._id}`}>

          </Link>
        </Flex>
        <Button 
        onClick={()=>handleAddToCart(product)}
        borderRadius="none" bg="gray.700" variant={"unstyled"} color="#fff" p="6px 12px" textAlign={"center"} w="full">
          ADD TO CART
        </Button>
      </Box>
    </Box>
  )
}

export default CardItem
