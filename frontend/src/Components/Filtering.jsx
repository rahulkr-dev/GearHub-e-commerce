import { Select, Box, Text, Flex, Button } from "@chakra-ui/react";

const Filter = ({ options, onFilterChange }) => {
  return (
    <Box>
      <Text>Filter by:</Text>
      <Select onChange={(e) => onFilterChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default Filter;