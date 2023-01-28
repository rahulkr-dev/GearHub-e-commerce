import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Skeleton, Box, Flex, Image, Center, Text, Select, VStack, Checkbox, Grid, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark } from '@chakra-ui/react';
import CardItem from '../Components/CardItem';

import { menCrausel as images } from '../Utils/crauselData';

import { Carousel as ImageSlider } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { GrSort as FilterIcon } from "react-icons/gr"
import { BiSortAlt2 as SortIcon } from "react-icons/bi"


// let url = `http://localhost:8080/api/product?filterBy=gender&filterName=male&sortBy=price&sortOrder=-1`
let url = `http://localhost:8080/api/product`
const Men = () => {
    const [data, setData] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        setisLoaded(true)
        getData(`${url}?filterBy=gender&filterName=male`)
    }, [])

    const getData = async (url) => {
        try {
            let res = await axios.get(url);
            setisLoaded(false);
            setData(res.data);
        } catch (err) {
            setisLoaded(false);
            setError(err.message)
        }

    }
    console.log(data)
    return (
        <Box pt="3.7rem" >
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
                    <Select w="max-content">
                        <option value=''>Most Relevent</option>
                        <option value='inc'>Price: Low to High</option>
                        <option value='desc'>Price: High to Low</option>
                        <option value='rating'>Rating</option>
                    </Select>
                </Center>
            </Flex>
            <Flex  justifyContent={"flex-start"} gap="5rem">
                <Grid ml="1rem" gap="2rem" borderWidth="1px" rounded="lg" overflow="hidden" p="1rem" pl="2rem" pr="2rem">
                    <Grid gap="5px" >
                        <Text fontWeight={"bold"} textAlign={"left"}>Brand</Text>
                        <Grid gap="5px">
                            <Checkbox>brand1</Checkbox>
                            <Checkbox>brand2</Checkbox>
                            <Checkbox>brand1</Checkbox>
                            <Checkbox>brand4</Checkbox>
                        </Grid>
                    </Grid>
                    <Grid gap="5px" >
                        <Text fontWeight={"bold"} textAlign={"left"}>Cateogry</Text>
                        <Grid gap="5px">
                            <Checkbox>Topwear</Checkbox>
                            <Checkbox>Footwear</Checkbox>
                            <Checkbox>Bottomwear</Checkbox>

                        </Grid>
                    </Grid>
                    <Grid gap="10px">
                        <Text fontWeight={"bold"} textAlign={"left"}>Price</Text>
                        <Slider aria-label='slider-ex-4' defaultValue={10}>
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



        </Box>
    )
}

export default Men