import React,{useEffect} from 'react'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack, Image, Text
} from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../Redux/admin/product/product.action';
const ProductList = () => {
  const dispatch = useDispatch();
  const store = useSelector(store => store);
  const { data } = store.admin
  dispatch(getProduct())

  useEffect(() => {

  }, [])
  return (
    <Box p={{ lg: "10rem 25%" }} pt="10rem" bg="gray.100">
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
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                      />
                      <Text>{item.name}</Text>
                    </Stack>
                  </Td>
                  <Td>FootWear</Td>
                  <Td>{item.price}rs
                    <Menu>
                      <MenuButton pl="1rem" w="min-content" bg="none" outline={"none"}>
                        <DragHandleIcon />
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>Dublicate</MenuItem>
                        <MenuItem>Add tag</MenuItem>
                        <MenuItem>Remove tag</MenuItem>
                        <MenuItem color="red">Delete</MenuItem>
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
  )
}

export default ProductList