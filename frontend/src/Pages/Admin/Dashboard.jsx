import React, { useEffect } from 'react'
import { Center, Box, Grid, Heading, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardInfo } from '../../Redux/admin/product/product.action';
import Loader from '../../Components/Loader';

const Dashboard = () => {
  const dispatch = useDispatch()
  const { productCount, userCount,orderCount } = useSelector(store => store.admin)
  const { loading } = useSelector(store => store.auth)

  useEffect(() => {
    dispatch(getDashboardInfo())
  }, [])

  return (
    <>
      <Box opacity={loading?"0.3":"1"} p={{ lg: "10rem 25%" }} pt="10rem" >
        <Grid gap="1.5rem" gridTemplateColumns={["repeat(1,1fr)", "repeat(2,1fr)", "repeat(3,1fr)"]} placeItems="center">
          <Center w="250px" bg="red.50" boxShadow="lg" p="3rem" >
            <Box>
              <Text>Total Product</Text>
              <Heading>{productCount}</Heading>
            </Box>
          </Center>
          <Center bg="red.50" w="250px" boxShadow="lg" p="3rem" >
            <Box>
              <Text>Total User</Text>
              <Heading>{userCount}</Heading>
            </Box>
          </Center>
          <Center bg="red.50" w="250px" boxShadow="lg" p="3rem" >
            <Box>
              <Text>Total Order</Text>
              <Heading>{orderCount}</Heading>
            </Box>
          </Center>
        </Grid>
      </Box>
      {loading && <Loader />}
    </>
  )
}

export default Dashboard