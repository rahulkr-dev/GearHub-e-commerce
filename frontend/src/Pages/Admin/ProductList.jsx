import React, { useEffect } from 'react'
import {
  Box, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Button, TableContainer, Menu, MenuButton, MenuList, MenuItem, Stack, Image, Text
} from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../Redux/admin/product/product.action';
import Loader from './../../Components/Loader';
import { deleteProduct } from './../../Redux/admin/product/product.action';
const ProductList = () => {
  const dispatch = useDispatch();
  const store = useSelector(store => store);
  const { loading } = useSelector(store => store.auth)
  const { data, totalProduct } = store.admin

  useEffect(() => {
    dispatch(getProduct())
  }, [totalProduct])

  const handleDeleteProduct = (id) => {
    // console.log(id)
    dispatch(deleteProduct(id))
  }
  return (
    <>

      <Box opacity={loading ? "0.3" : "1"} p={{ lg: "10rem 25%" }} pt="10rem" bg="gray.100">
        <TableContainer overflowX={{ base: "scroll", md: "auto", lg: "auto" }} bg="#fff">
          <Table>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Category</Th>
                <Th>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* get data from database and map it */}
              {
                data.map((item) => (
                  <Tr key={item._id} >
                    <Td>
                      <Stack direction='row'>
                        <Image
                          boxSize='30px'
                          borderRadius={"full"}
                          objectFit='cover'
                          src={item.image_urls[0]}
                          alt={item.name}
                        />
                        <Text>{item.name}</Text>
                      </Stack>
                    </Td>
                    <Td>{item.category}</Td>
                    <Td> ₹  {item.price}
                      <Menu>
                        <MenuButton pl="1rem" w="min-content" bg="none" outline={"none"}>
                          <DragHandleIcon />
                        </MenuButton>
                        <MenuList>
                          <MenuItem>Edit</MenuItem>
                          <MenuItem>Dublicate</MenuItem>
                          <MenuItem>Add tag</MenuItem>
                          <MenuItem>Remove tag</MenuItem>
                          <MenuItem onClick={() => handleDeleteProduct(item._id)} color="red">Delete</MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                    <Td>

                    </Td>
                  </Tr>
                ))
              }

            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
      </Box>
      {loading && <Loader />}
    </>
  )
}

export default ProductList