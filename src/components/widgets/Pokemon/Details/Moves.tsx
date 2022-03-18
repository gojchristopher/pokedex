import {
  Box,
  HStack,
  VStack,
  Text,
  Table,
  Tr,
  Tbody,
  Th,
  Td,
} from "@chakra-ui/react";
import React from "react";
import "@fontsource/inter";
import { Flex } from "@chakra-ui/react";
import Card from "src/components/widgets/Card";
import SkillCard from "src/components/widgets/SkillCard";

const Moves = () => {
  return (
    <Box>
      <Card>
        <Flex pl={12} pr={12} pt={6} pb={6} justify="space-between">
          <VStack align="left" gap={6} width="6.25rem">
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="600"
              lineHeight="26px"
              color="text.blue400"
            >
              Quick Moves
            </Text>
            <SkillCard
              name="Ember"
              borderColor="text.blue200"
              bg="text.blue50"
              color="text.blue700"
            />
            <SkillCard
              name="Fire Spin"
              borderColor="text.blue200"
              bg="text.blue50"
              color="text.blue700"
            />
          </VStack>
          <Box>
            <Table
              width="18.563rem"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="600"
              fontSize="14px"
              lineHeight="17px"
              color="text.gray100"
            >
              <Tr>
                <Td>Damage</Td>
                <Td>DPS</Td>
                <Td>EPS</Td>
              </Tr>
              <Tbody>
                {Array(2)
                  .fill(null)
                  .map((item, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td>10</Td>
                        <Td>10</Td>
                        <Td>10</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Card>

      <Card mt={8}>
        <Flex pl={12} pr={12} pt={6} pb={6} justify="space-between">
          <VStack align="left" gap={6} width="6.25rem">
            <Text
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="600"
              lineHeight="26px"
              color="text.blue400"
            >
              Main Moves
            </Text>
            {Array(4)
              .fill(["Fireblast", "Flame Thrower", "Heat Wave", "Over Heat"])
              .map((item, idx) => {
                return (
                  <SkillCard
                    key={idx}
                    name={item[idx]}
                    borderColor="text.blue200"
                    bg="text.blue50"
                    color="text.blue700"
                  />
                );
              })}
          </VStack>
          <Box>
            <Table
              width="18.563rem"
              fontFamily="Inter"
              fontStyle="normal"
              fontWeight="600"
              fontSize="14px"
              lineHeight="17px"
              color="text.gray100"
            >
              <Tr>
                <Td>Damage</Td>
                <Td>DPS</Td>
                <Td>EPS</Td>
              </Tr>
              <Tbody>
                {Array(4)
                  .fill(null)
                  .map((item, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td>10</Td>
                        <Td>10</Td>
                        <Td>10</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default Moves;
