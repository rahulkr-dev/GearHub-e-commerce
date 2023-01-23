import React from "react";
import { Select, Box, Text, Flex, Button } from "@chakra-ui/react";
const Sorting = ({ options, onSortChange }) => {
    return (
      <Flex>
        <Text>Sort by:</Text>
        <Select onChange={(e) => onSortChange(e.target.value)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Button onClick={() => onSortChange("asc")}>Asc</Button>
        <Button onClick={() => onSortChange("desc")}>Desc</Button>
      </Flex>
    );
  };
 
  export default Sorting
  
  
  
  
  