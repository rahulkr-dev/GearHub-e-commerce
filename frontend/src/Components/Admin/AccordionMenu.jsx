import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Flex, Box, Text, Grid
} from '@chakra-ui/react'
import { Link } from "react-router-dom";


const AccordionMenu = ({ heading, links,onClose }) => {
    const Icon = heading[0];
    const headingContent = heading[1]
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton color={"white"} >
                        <Flex alignItems={"center"} justifyContent="space-between" >
                            <Box mr="15px">
                                <Icon color="white" />
                            </Box>
                            <Box w="8rem" as="span" flex='1' textAlign='left'>
                                {headingContent}
                            </Box>
                        </Flex>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                <Grid>
                {links.map((item, index) => {
                        return (
                            <Text onClick={onClose} key={index} fontWeight={"bold"} p="3px" pl="2rem" _hover={{bg:"gray.700"}} color="white" >
                                <Link to={item.link} >{item.name}</Link>
                            </Text>
                        )
                    })}
                </Grid>
                </AccordionPanel>
            </AccordionItem>

        </Accordion>
    )
}

export default AccordionMenu