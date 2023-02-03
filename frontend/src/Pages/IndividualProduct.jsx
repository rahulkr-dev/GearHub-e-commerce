import React from 'react'
import { useState, useEffect } from 'react';
import {
    Box, Grid, Text, Button, Image, Flex, Heading, Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Input, FormControl, FormLabel, Select
} from "@chakra-ui/react"
import { GiReturnArrow } from "react-icons/gi"
import { TbTruckDelivery } from "react-icons/tb"
import { FaHandPointRight } from "react-icons/fa"
import axios from "axios"
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Footer from "../Components/Footer"
import { AiTwotoneStar } from "react-icons/ai"

const initRating = {
    rating: "",
    review_title: "",
    comment: ""
}

let url = `http://localhost:8080/api/product`;
const IndividualProduct = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(initRating)
    const [reviews, setReviews] = useState([])
    const { productId } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { token } = useSelector(store => store.auth)

    // console.log(productId)

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            let res = await axios.get(`${url}/individual/${productId}`);
            setData(res.data);
            setLoading(false)
        } catch (err) {
            setLoading(false);
            setError(err.message)
        }
    }
    // console.log(data)
    const handleRatingChange = (e) => {
        const { value, name } = e.target;
        setRating({ ...rating, [name]: value })
    }

    const publishRating = () => {
        // console.log(rating)
        const payloadData = {
            token,
            payload: rating
        };
        addPublishRating(payloadData);
        setRating(initRating)
        onClose()

    }

    const addPublishRating = async (payload) => {
        try {
            setLoading(true);
            let res = await axios.post(`${url}/add/review/${productId}`, payload);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message)
        }
    }

    const showComment = async () => {
        try {
            setLoading(true);
            let res = await axios.get(`${url}/get/review/${productId}`);
            setLoading(false);
            setReviews(res.data)
        } catch (err) {
            setLoading(false);
            setError(err.message)
        }
    }
    console.log(reviews)
    return (
        <>
            <Box pt="5rem" bg="gray.100">

                {data?.name && <Grid gap="1rem">
                    <Flex justifyContent={"center"} gap="1rem" flexWrap={"wrap"}>
                        {data.image_urls.map((item, i) => (
                            <Image boxSize={"20rem"} src={item} />
                        ))}
                    </Flex>
                    <Grid textTransform={"uppercase"} fontFamily={"monospace"} justifyContent="center" gap="15px">
                        <Heading>{data.brand}</Heading>
                        <Text color={"gray"} fontSize={"1.5rem"}>{data.name}</Text>
                        <Heading> ₹ {data.price}</Heading>
                    </Grid>
                    <Center>
                        <Button w="max-content" colorScheme={"yellow"} p="1rem">ADD TO CART</Button>

                    </Center>
                </Grid>}
                {/* information cars */}
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

                {/* Write Review  we are creating modal*/};

                <Box p="1rem">
                    <Button color="white" p="10px 20px" colorScheme={"blue"} maxW="max-content" boxShadow={"2xl"} borderRadius="md" w="full" onClick={onOpen}>WRITE REVIEW</Button>

                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>WRITE A REVIEW</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Grid gap="15px">
                                    <FormControl >
                                        <Box>
                                            <Select value={rating.rating} name="rating" onChange={handleRatingChange} placeholder='Product Rating'>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </Select>
                                        </Box>
                                        <FormLabel >Review Title*</FormLabel>
                                        <Input
                                            value={rating.review_title} name="review_title" onChange={handleRatingChange}
                                            variant={"unstyled"} p="10px 20px" bg="gray.200" placeholder="Enter a Maximum 50 Characters" />
                                    </FormControl>
                                    <FormControl >
                                        <FormLabel  >Comment*</FormLabel>
                                        <Input
                                            value={rating.comment} name="comment" onChange={handleRatingChange}
                                            variant={"unstyled"} p="15px 20px" bg="gray.200" placeholder="Enter a Maximum 500 Characters" />
                                    </FormControl>
                                    <FormControl >
                                        <FormLabel>Will you recommend this product?*</FormLabel>
                                        <Flex>
                                            <Button>YES</Button>
                                            <Button>NO</Button>
                                        </Flex>
                                    </FormControl>
                                </Grid>

                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    onClick={publishRating}
                                    variant={"unstyled"} bg="gray.200" p="10px 15px" color="#fff" >PUBLISH</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
                <Box>
                    <Button onClick={showComment} color="black" p="10px 20px" colorScheme={"yellow"} maxW="max-content" boxShadow={"2xl"} borderRadius="md" w="full">VIEW REVIEW</Button>
                    {reviews.map((item, i) => (
                        <Grid mt="1rem" justifyContent={"flex-start"} key={i} shadow="dark-lg" gap="10px" p="1rem">
                            <Center w="max-content" bg="gray.100" gap="10px" p="6px 12px" borderRadius={"md"}>
                                <Text fontWeight={"bold"}>Rating  <Text as ="span">{item.rating}</Text></Text>
                                <Text color="yellow.300">
                                    <AiTwotoneStar />
                                </Text>
                            </Center>
                            <Text textAlign={"left"} color="black" fontWeight={"bold"} fontSize={"1.5rem"}>{item.review_title}</Text>
                            <Text>{item.comment}</Text>
                        </Grid>
                    ))}

                </Box>

            </Box>
            <Footer />
        </>
    )
}

export default IndividualProduct