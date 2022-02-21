import React from "react";
import { Box, Text } from "@chakra-ui/react";

import AnimalCard from "./AnimalCard";
import { web3 } from "../web3Config";

export interface IMyAnimalCard {
  animalTokenId: string;
  animalType: string;
  animalPrice: string;
}
interface IProps extends IMyAnimalCard {
  saleStatus: boolean;
  account: string;
}

const MyAnimalCard: React.FC<IProps> = ({
  animalTokenId,
  animalType,
  animalPrice,
  saleStatus,
  account,
}) => {
  return (
    <Box textAlign="center" w={150}>
      <AnimalCard animalType={animalType} />
      <Box mt={2}>
        {animalPrice === "0" ? (
          <div>button</div>
        ) : (
          <Text d="inline-block">{web3.utils.fromWei(animalPrice)} Matic</Text>
        )}
      </Box>
    </Box>
  );
};

export default MyAnimalCard;
