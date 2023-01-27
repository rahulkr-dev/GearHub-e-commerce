import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {Box, Grid, Input, Button, Flex, FormLabel, Heading, Badge, useToast} from '@chakra-ui/react'
import { itemAddedReset, addProduct } from './../../Redux/admin/product/product.action';
const style = { color: "gray", border: "1px solid gray", padding: "8px 12px", fontWeight: "500", width: "100%", outline: "none", background: "transparent" }
const btnStyle = { borderRadius: "6px", background: "#555555", color: "white", fontWeight: 'bold', border: "1px solid gray", padding: "5px 12px", width: "max-content", margin: "5px 0" }

const init = {
  name: "",
  brand: "",
  price: "",
  category: "",
  description: "",
  color: "",
  gender: "",
  size: ""
}
const Product = () => {
  const [product, setProduct] = useState(init);
  const [image, setImage] = useState("");
  const [imageStore, setImageStore] = useState([]);
  const toast = useToast();
  const dispatch = useDispatch();
  const store = useSelector(store => store);
  const {itemAdded,error} = store.admin;
  const {loading} = store.auth


  useEffect(() => {
    if (itemAdded) {
      displayToast('', "Product Added Successfully", 'success');
      dispatch(itemAddedReset)
    }
  }, [itemAdded])

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }
  const handleSubmit = () => {
    const payload = {...product,image_urls:imageStore};
    // dispatching payload to trigering action;
    dispatch(addProduct(payload))
    setProduct(init);
    setImage("");
    setImageStore([])
  }
  const addImage = () => {
    setImageStore([...imageStore, image]);
    setImage("")
  }

  function displayToast(title, desc, msg) {
    toast({
      title: title,
      description: desc,
      status: msg,
      duration: 9000,
      isClosable: true,
    })
  }
  return (
    <Box p={{ base: "10px", lg: "10rem 25%" }} pt="10rem" bg="gray.200">
      <Flex justifyContent={"space-between"} >
        <Heading mb="10px" >Add Product</Heading>
        {/* <Button as="button" bg="yellow" p={"0 1.5rem"} >ADD</Button> */}
        <button onClick={handleSubmit} style={btnStyle} >Add Product</button>

      </Flex>
      <Grid gap="1rem"  >
        <Box bg="gray.100" p="2rem"  >
          <FormLabel>Product Name</FormLabel>
          <input name="name" value={product.name} onChange={handleChange} style={style} type="text" />
          <FormLabel mt="10px">Brand</FormLabel>
          <input name="brand" value={product.brand} onChange={handleChange} style={style} type="text" />
          <FormLabel mt="10px">Price</FormLabel>
          <input name="price" value={product.price} onChange={handleChange} style={style} type="number" />
        </Box>


        <Box bg="gray.100" p="2rem">
          <FormLabel>Description</FormLabel>
          <textarea name="description" value={product.description} onChange={handleChange} style={style} ></textarea>
        </Box>


        <Box textAlign={"left"} bg="gray.100" p="2rem">
          {imageStore.map((item, i) => <Badge colorScheme={'telegram'} w="4rem" overflow="hidden" key={i} >{item}</Badge>)}
          <FormLabel>Image</FormLabel>
          <input value={image} onChange={(e) => setImage(e.target.value)} style={style} type="text" />
          <button disabled={imageStore.length == 3} onClick={addImage} style={btnStyle} >ADD</button>

        </Box>

        <Box bg="gray.100" p="2rem">
          <FormLabel>Category</FormLabel>
          <select
            name="category" value={product.category} onChange={handleChange}
            style={style} id="">
            <option value="">Select</option>
            <option value="Footwear">Footwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Topwear">Topwear</option>
            <option value="Accessories">Accessories</option>
          </select>
        </Box>
        <Box bg="gray.100" p="2rem"  >
          <FormLabel>Color</FormLabel>
          <input name="color" value={product.color} onChange={handleChange} style={style} type="text" />
        </Box>
        <Box bg="gray.100" p="2rem">
          <FormLabel>Size</FormLabel>
          <select name="size" value={product.size} onChange={handleChange}
            style={style} id="">
            <option value="">Select</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </Box>
        <Box bg="gray.100" p="2rem">
          <FormLabel>Gender</FormLabel>
          <select name="gender" value={product.gender} onChange={handleChange}
            style={style} id="">
            <option value="">Select</option>
            <option value="male">Men</option>
            <option value="female">Women</option>
            <option value="kids">Kids</option>
            <option value="all">All</option>
          </select>
        </Box>
      </Grid>
    </Box>
  )
}

export default Product