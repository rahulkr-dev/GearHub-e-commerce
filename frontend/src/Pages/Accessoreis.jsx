import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Skeleton, Box, Flex, Image, Center, Text, Select, VStack, Checkbox, Grid, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Button } from '@chakra-ui/react';
import CardItem from '../Components/CardItem';
import Footer from "../Components/Footer"

import { assessCrausel as images } from '../Utils/crauselData';

import { Carousel as ImageSlider } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { GrSort as FilterIcon } from "react-icons/gr"
import { BiSortAlt2 as SortIcon } from "react-icons/bi"
import Loader from './../Components/Loader';
import { useSelector } from 'react-redux';
import {FaGreaterThan} from "react-icons/fa"
import { production_url,development_url } from './../Utils/urlLinks';

let url = `${production_url}/api/product`

// let url = `http://localhost:8080/api/product/pagenation`

const Accessoreis = () => {
  const [page,setPage] = useState(1)
  const [data, setData] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [brandValue,setBrandValue] = useState([]);
  const [categoryValue,setCategoryValue] = useState([])
  const [sliderValue, setSliderValue] = useState(10)
  const { loading } = useSelector((store => store.cart))

  useEffect(() => {
      setisLoaded(true);
      let newUrl =`${url}/pagenation?filterBy=category&filterName=Accessories&pageNo=${page}&limit=10`
      getData(newUrl)
  }, [page])


  const getData = async (newUrl) => {
      // eg = filterBy=gender,filter=male,
      try {
          setisLoaded(true)
          let res = await axios.get(newUrl);
          setisLoaded(false);
          setData(res.data);
      } catch (err) {
          setisLoaded(false);
          setError(err.message)
      }
  }
  const getFilterData = async(body)=>{
      let newUrl = `${url}/multiple-filter`
      try {
          setisLoaded(true)
          let res = await axios.post(newUrl,body);
          setisLoaded(false);
          setData(res.data);
      } catch (err) {
          setisLoaded(false);
          setError(err.message)
      }
  }
  const handleIncrement = ()=>{
      setPage(page+1)
  }
  const handleDecrement = ()=>{
      setPage(page-1)

  }
  const handleSorting = (e)=>{
      switch(e.target.value){
          case "inc" :{
              let newUrl =`${url}/pagenation?filterBy=category&filterName=Accessories&pageNo=${page}&limit=10&sortBy=price&sortOrder=1`
              getData(newUrl)
          }
          case "desc" :{
              let newUrl =`${url}/pagenation?filterBy=category&filterName=Accessories&pageNo=${page}&limit=10&sortBy=price&sortOrder=-1`
              getData(newUrl)
          }
          default : setPage(1)
      }
  }

  const handleCheckBrand = (e)=>{
      const {value} = e.target
      if(brandValue.includes(value)){
          let data = brandValue.filter(item=>item!=value);
          const payload = {
              brand:data,
              category:categoryValue
          }
          getFilterData(payload)
          setBrandValue(data)
      }else{
          const payload = {
              brand:[...brandValue,value],
              category:categoryValue
          }
          getFilterData(payload)
          setBrandValue([...brandValue,value])
      }
  }
  const handleCategory = (e)=>{
      const {value} = e.target
      if(categoryValue.includes(value)){
          let data = categoryValue.filter(item=>item!=value);
          const payload = {
              brand:brandValue,
              category:data
          }
          getFilterData(payload)
          setCategoryValue(data)
      }else{
          const payload = {
              brand:brandValue,
              category:[...categoryValue,value]
          }
          getFilterData(payload)
          setCategoryValue([...categoryValue,value])
      }
  }

  const handleSetSlider = (val)=>{
      setSliderValue(val)
      console.log(val)
  }

  return (
      <>
 
      <Box opacity={isLoaded?"0.3":"1"} pt="3.7rem" >
          <Box>
              <ImageSlider autoPlay={true} infiniteLoop={true} showThumbs={false} >
                  {images.map((item, i) => (
                      <Box bg="white" key={i} position={"relative"} >
                          <Image src={item.image} />
                      </Box>

                  ))}
              </ImageSlider>
          </Box>
          <Flex p="1.5rem" justifyContent={"space-between"} alignContent="center">
              <Center gap={"10px"} ><Box ><FilterIcon /></Box> <Text>Filter</Text> </Center>
              <Center gap="1rem">
                  <Center gap={"10px"} ><Text>Sort</Text><Box transform={"rotate(90deg)"} ><SortIcon /></Box>  </Center>
                  <Select w="max-content" onChange={handleSorting}>
                      <option value=''>Most Relevent</option>
                      <option value='inc'>Price: Low to High</option>
                      <option value='desc'>Price: High to Low</option>
                      <option value='rating'>Rating</option>
                  </Select>
              </Center>
          </Flex>
          <Flex  justifyContent={"flex-start"} gap="5rem">
              <Grid ml="1rem" gap="2rem" borderWidth="1px" rounded="lg" overflow="hidden" p="1rem" pl="2rem" pr="2rem" h="max-content">
                  <Grid gap="5px" h="max-content" >
                      <Text fontWeight={"bold"} textAlign={"left"}>Brand</Text>
                      <Grid gap="5px">
                          <Checkbox value="artengo" checked={brandValue.includes('artengo')} onChange={handleCheckBrand} >ARTENGO</Checkbox>
                          <Checkbox value="flx" checked={brandValue.includes('flx')} onChange={handleCheckBrand}>FLX</Checkbox>
                          <Checkbox value="kipsta" checked={brandValue.includes('kipsta')} onChange={handleCheckBrand}>KIPSTA</Checkbox>
                          <Checkbox value="quechua" checked={brandValue.includes('quechua')} onChange={handleCheckBrand}>QUECHUA</Checkbox>
                          <Checkbox value="domyos" checked={brandValue.includes('domyos')} onChange={handleCheckBrand}>DOMYOS</Checkbox>
                      </Grid>
                  </Grid>
                  <Grid gap="5px" >
                      <Text fontWeight={"bold"} textAlign={"left"}>Cateogry</Text>
                      <Grid gap="5px">
                          <Checkbox value="Topwear" checked={categoryValue.includes('Topwear')} onChange={handleCategory} >Topwear</Checkbox>
                          <Checkbox value="Footwear" checked={categoryValue.includes('Footwear')} onChange={handleCategory}>Footwear</Checkbox>
                          <Checkbox value="Bottomwear" checked={categoryValue.includes('Bottomwear')} onChange={handleCategory}>Bottomwear</Checkbox>

                      </Grid>
                  </Grid>
                  <Grid gap="10px">
                      <Text fontWeight={"bold"} textAlign={"left"}>Price</Text>
                      <Slider aria-label='slider-ex-4' defaultValue={10}
                      onChange={(val) => handleSetSlider(val)}
                      >
                          <SliderTrack bg='red.100'>
                              <SliderFilledTrack bg='tomato' />
                          </SliderTrack>
                          <SliderThumb boxSize={6}>
                              <Box color='tomato' />
                          </SliderThumb>
                      </Slider>
                      <Flex gap="10px" justifyContent={"space-evenly"} alignItems="center">
                          <Text p="8px 12px" bg="gray">99</Text>
                          <Text>To</Text>
                          <Text p="8px 12px" bg="gray" >4999</Text>
                      </Flex>
                  </Grid>

              </Grid>
              {/* products */}
              <Grid gap="2rem" gridTemplateColumns={["repeat(2,1fr)", "repeat(3,1fr)", "repeat(4,1fr)"]}
              // p={["15px", "1.5rem", "5rem 8rem 3rem 8rem"]}
              >
                  {
                      data.map((item) => (
                          <CardItem key={item._id} product={item} />
                      ))
                  }
              </Grid>
          </Flex>
          {/* page nation */}
          <Box m="1rem" mt="2rem">
              <Flex w="max-content" gap="10px" justifyContent={"center"} alignItems="center" m="auto">
                  <Button isDisabled={page<=1} transform={"rotate(180deg)"} onClick={handleDecrement}>
                      <FaGreaterThan />
                  </Button>
                  <Text p="1px 10px" borderWidth={"2px"} fontFamily={"monospace"} fontSize="1.3rem">{page}</Text>
                  <Button onClick={handleIncrement}>
                      <FaGreaterThan />
                  </Button>

              </Flex>
          </Box>
      </Box>
      <Footer />
      {isLoaded && <Loader />}
      </>
  )
}

export default Accessoreis