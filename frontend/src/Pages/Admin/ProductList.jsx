import React from 'react'
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
  Stack,Image,Text,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons'
const ProductList = () => {
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
            <Tr>
              {/* get data from database and map it */}
              <Td>
                <Stack direction='row'>
                  <Image
                    boxSize='30px'
                    borderRadius={"full"}
                    objectFit='cover'
                    src='https://bit.ly/dan-abramov'
                    alt='Dan Abramov'
                  />
                  <Text>Ipad mini 7th gen</Text>
                </Stack>
              </Td>
              <Td>FootWear</Td>
              <Td>6000 rs
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
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ProductList