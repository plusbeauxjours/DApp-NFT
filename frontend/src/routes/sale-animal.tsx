import React, { useEffect, useState } from "react";
import { Grid, Button, Text, Flex } from "@chakra-ui/react";

import AnimalCard from "../components/AnimalCard";
import {
  mintAnimalTokenContract,
  saleAnimalTokenAddress,
  saleAnimalTokenContract,
} from "../web3Config";
import MyAnimalCard, { IMyAnimalCard } from "../components/MyAnimalCard";

interface IProps {
  account: string;
}

const MyAnimal: React.FC<IProps> = ({ account }) => {
  const [saleAnimalCard, setSaleAnimalCard] = useState<IMyAnimalCard[]>();

  const getOnSaleAnimalTokens = async () => {
    try {
      const onSaleAnimalTokenArrayLength = await saleAnimalTokenContract.methods
        .getOnSaleAnimalTokenArrayLength()
        .call();

      const tempOnSaleArray: IMyAnimalCard[] = [];

      for (let i = 0; i < parseInt(onSaleAnimalTokenArrayLength, 10); i++) {
        const animalTokenId = await saleAnimalTokenContract.methods
          .onSaleAnimalTokenArray(i)
          .call();

        const animalType = await mintAnimalTokenContract.methods
          .animalTypes(animalTokenId)
          .call();

        const animalPrice = await saleAnimalTokenContract.methods
          .animalTokenPrices(animalTokenId)
          .call();

        tempOnSaleArray.push({ animalTokenId, animalType, animalPrice });
      }

      setSaleAnimalCard(tempOnSaleArray);
      console.log(tempOnSaleArray);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOnSaleAnimalTokens();
  }, []);
  return (
    <>
      <Grid mt={4} templateColumns={"repeat(4, 1fr)"} gap={8}></Grid>
    </>
  );
};

export default MyAnimal;
