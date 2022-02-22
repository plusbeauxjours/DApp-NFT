import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { web3 } from "../web3Config";
import AnimalCard from "./AnimalCard";

interface IProps {
  animalType: string;
  animalPrice: string;
}

const SaleAnimalCard: React.FC<IProps> = ({ animalType, animalPrice }) => {
  return (
    <Box textAlign="center" w={150}>
      <AnimalCard animalType={animalType} />
      <Box textAlign="center" w={150}>
        <Text d="inline-block">{web3.utils.fromWei(animalPrice)} Matic</Text>
        <Button size="sm" colorScheme="green" m={2} />
      </Box>
    </Box>
  );
};

export default SaleAnimalCard;
