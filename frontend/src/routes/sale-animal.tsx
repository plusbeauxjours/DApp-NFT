import React, { useEffect, useState } from "react";
import { Box, Grid } from "@chakra-ui/react";

import {
  mintAnimalTokenContract,
  saleAnimalTokenContract,
} from "../web3Config";
import { IMyAnimalCard } from "../components/MyAnimalCard";
import SaleAnimalCard from "../components/SaleAnimalCard";

interface IProps {
  account: string;
}

const SaleAnimal: React.FC<IProps> = ({ account }) => {
  const [saleAnimalCardArray, setSaleAnimalCardArray] =
    useState<IMyAnimalCard[]>();

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

      setSaleAnimalCardArray(tempOnSaleArray);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOnSaleAnimalTokens();
  }, []);

  return (
    <Grid mt={4} templateColumns={"repeat(4, 1fr)"} gap={8}>
      {saleAnimalCardArray &&
        saleAnimalCardArray.map((v, i) => (
          <SaleAnimalCard
            key={i}
            account={account}
            animalTokenId={v.animalTokenId}
            animalType={v.animalType}
            animalPrice={v.animalPrice}
            getOnSaleAnimalTokens={getOnSaleAnimalTokens}
          />
        ))}
    </Grid>
  );
};

export default SaleAnimal;
