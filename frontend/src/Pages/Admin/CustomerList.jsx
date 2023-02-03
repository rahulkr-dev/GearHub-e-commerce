import React, { useEffect } from 'react'
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
  MenuItem
} from '@chakra-ui/react'
import { DragHandleIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux';
import { getCustomer } from '../../Redux/admin/customer/customer.action';

const CustomerList = () => {
  const dispatch = useDispatch()
  const store = useSelector(store => store);
  const { customerAdded, data, error } = store.customer;
  const { loading } = store.auth;
  useEffect(() => {
    dispatch(getCustomer())
  }, [])
  return (
    <Box p={{ lg: "10rem 25%" }} pt="10rem" bg="gray.100">
      <TableContainer overflowX={{ base: "scroll", md: "auto", lg: "auto" }} bg="#fff">
        <Table bg="gray.200" variant='striped' colorScheme='cyan' >
          <Thead >
            <Tr  >
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Registered</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                {/* get data from database and map it */}
                <Td>{item.name}</Td>
                <Td>{item.email}</Td>
                <Td>{item.createdAt.split('T')[0]}
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
            ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default CustomerList