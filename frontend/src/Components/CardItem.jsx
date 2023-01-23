import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardItem = ({product}) => {
    return (
        <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
          <Image src={product.imageUrl} alt={product.name} objectFit="cover" h="200px" />
          <Box p="6">
            <Text fontWeight="bold" fontSize="lg">
              {product.name}
            </Text>
            <Text color="gray.500">{product.price}</Text>
            <Flex mt="auto">
              <Link to={`/product/${product.id}`}>
                <Button variantColor="teal" size="sm">
                  Learn more
                </Button>
              </Link>
            </Flex>
          </Box>
        </Box>
    )
}
