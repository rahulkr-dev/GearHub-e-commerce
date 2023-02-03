import React, { useEffect } from 'react'
import { Box, Image, Text, Flex, Grid, Center } from '@chakra-ui/react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ImageSlider } from "react-responsive-carousel"
import { landingPaCrau as images } from '../Utils/crauselData';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { cateogryInfo } from './landingPageData';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from './../Utils/crauselBreakPoints';
import { useDispatch, useSelector } from 'react-redux';
import { getDataLandingPage } from './../Redux/products/product.action';
import CardItem from '../Components/CardItem';
import Footer from '../Components/Footer';
import Loader from './../Components/Loader';


const LandingPage = () => {

  const dispatch = useDispatch()
  const { men, women, kids, accessories } = useSelector(store => store.product);
  const { loading } = useSelector((store => store.cart))


  useEffect(() => {
    dispatch(getDataLandingPage())
  }, [])
  return (
    <>
      <Box opacity={loading?"0.3":"1"}>
        <Box pt="3.7rem" bg="gray.200">
          <ImageSlider autoPlay={true} infiniteLoop={true} showThumbs={false}>
            {images.map((item, i) => (
              <Box bg="white" key={i} >
                <Image src={item.image} />
              </Box>
            ))}
          </ImageSlider>
        </Box>
        <Flex p="1rem 10px" bg="blue.100" mt="2rem" justifyContent={"space-evenly"} fontFamily="fantasy" >
          <Flex gap="10px" >
            <Text color="gray.700" >2 Years Of Warranty</Text>
            <Center borderRadius={"full"} p="3px" bg="#fff" ><ArrowForwardIcon /></Center>
          </Flex>
          <Flex gap="10px">
            <Text color="gray.700" >Easy Return</Text>
            <Center borderRadius={"full"} p="3px" bg="#fff" ><ArrowForwardIcon /></Center>
          </Flex>
          <Flex gap="10px">
            <Text color="gray.700" >10+ Sports & 100+ Products</Text>
            <Center borderRadius={"full"} p="3px" bg="#fff" ><ArrowForwardIcon /></Center>
          </Flex>
        </Flex>

        <Grid m="2rem 1rem" gridTemplateColumns={["repeat(2,1fr)", "repeat(3,1fr)", "repeat(4,1fr)"]} gap="12px" >
          {cateogryInfo.map((item, i) => (
            <Box key={i} position="relative"  >
              <Image borderTopRadius={"1.5rem"} src={item.image} />
              <Flex >
                <Center h="3.2rem" fontWeight={"bold"} color="black" fontSize={"1.6rem"} bg="yellow.500" borderBottomLeftRadius={'1.5rem'} w="50%">₹ {item.price}</Center>
                <Center color="white" h="3.2rem" borderBottomRightRadius={'1.5rem'} p="15px" w="50%" bg="blue.300" >Explore More</Center>
              </Flex>
              <Text left="7%" color={"#fff"} fontWeight={"bold"} fontSize={['1rem', '1.3rem', "1.8rem"]} top="60%" position="absolute"  >{item.name}</Text>
              <Text fontSize={[".7rem", ".9rem", "1rem"]} left="7%" color="gray.400" top="69%" position="absolute"  >STARTING FROM</Text>
            </Box>
          ))}
        </Grid>

        <Box p={["1rem", "1rem 2rem", "1rem 10rem"]} m="auto">
          <Text fontWeight={"bold"} textAlign={"left"} color="gray.500" mb="10px" fontFamily={"heading"} fontSize={"1.3rem"} >Trending Collection for Men</Text>
          <Box >
            <Carousel responsive={responsive()} >
              {men.map((item) => (
                <CardItem key={item._id} product={item} />
              ))}
            </Carousel>
          </Box>
        </Box>

        <Box p={["1rem", "1rem 2rem", "1rem 10rem"]} m="auto">
          <Text fontWeight={"bold"} textAlign={"left"} color="gray.500" mb="10px" fontFamily={"heading"} fontSize={"1.3rem"} >Trending Collection for Women</Text>
          <Box >
            <Carousel responsive={responsive()} >
              {women.map((item) => (
                <CardItem key={item._id} product={item} />
              ))}
            </Carousel>
          </Box>
        </Box>

        <Box p={["1rem", "1rem 2rem", "1rem 10rem"]} m="auto">
          <Text fontWeight={"bold"} textAlign={"left"} color="gray.500" mb="10px" fontFamily={"heading"} fontSize={"1.3rem"} >Trending Collection for Kids</Text>
          <Box >
            <Carousel responsive={responsive()} >
              {kids.map((item) => (
                <CardItem key={item._id} product={item} />
              ))}
            </Carousel>
          </Box>
        </Box>

        <Box p={["1rem", "1rem 2rem", "1rem 10rem"]} m="auto">
          <Text fontWeight={"bold"} textAlign={"left"} color="gray.500" mb="10px" fontFamily={"heading"} fontSize={"1.3rem"} >Trending Collection for Accessories</Text>
          <Box >
            <Carousel responsive={responsive()} >
              {accessories.map((item) => (
                <CardItem key={item._id} product={item} />
              ))}
            </Carousel>
          </Box>
        </Box>
        {/* ==========FOOTER ================= */}
        <Footer />
      </Box>
      {loading && <Loader />}
    </>
  )
}

export default LandingPage