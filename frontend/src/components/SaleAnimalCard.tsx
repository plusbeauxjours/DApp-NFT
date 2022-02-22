import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

import {
  mintAnimalTokenContract,
  saleAnimalTokenContract,
  web3,
} from "../web3Config";
import AnimalCard from "./AnimalCard";

interface IProps {
  account: string;
  animalTokenId: string;
  animalType: string;
  animalPrice: string;
  getOnSaleAnimalTokens: () => Promise<void>;
}

const SaleAnimalCard: React.FC<IProps> = ({
  account,
  animalTokenId,
  animalType,
  animalPrice,
  getOnSaleAnimalTokens,
}) => {
  const [isBuyable, setIsBuyable] = useState<boolean>(false);

  const getAnimalTokenOwner = async () => {
    try {
      const response = await mintAnimalTokenContract.methods
        .ownerOf(animalTokenId)
        .call();

      setIsBuyable(
        account.toLocaleLowerCase() !== response.toLocaleLowerCase()
      );
    } catch (e) {
      console.log(e);
    }
  };

  const onClickBuy = async () => {
    try {
      if (!account) return;
      const response = await saleAnimalTokenContract.methods
        .purchaseAnimalToken(animalTokenId)
        .send({ from: account, value: animalPrice });

      if (response.status) {
        getOnSaleAnimalTokens();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAnimalTokenOwner();
  }, []);

  return (
    <Box textAlign="center" w={150}>
      <AnimalCard animalType={animalType} />
      <Box textAlign="center" w={150}>
        <Text d="inline-block">{web3.utils.fromWei(animalPrice)} Matic</Text>
        <Button
          size="sm"
          colorScheme="green"
          m={2}
          // disabled={!isBuyable}
          onClick={onClickBuy}
        >
          Buy
        </Button>
      </Box>
    </Box>
  );
};

export default SaleAnimalCard;
