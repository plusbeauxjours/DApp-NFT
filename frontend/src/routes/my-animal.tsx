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
  const [animalCardArray, setAnimalCardArray] = useState<IMyAnimalCard[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);

  const getAnimalTokens = async () => {
    try {
      const balanceLength = await mintAnimalTokenContract.methods
        .balanceOf(account)
        .call();

      const tempAnimalCardArray = [];

      for (let i = 0; i < parseInt(balanceLength, 10); i++) {
        const animalTokenId = await mintAnimalTokenContract.methods
          .tokenOfOwnerByIndex(account, i)
          .call();

        const animalType = await mintAnimalTokenContract.methods
          .animalTypes(animalTokenId)
          .call();

        const animalPrice = await saleAnimalTokenContract.methods
          .animalTokenPrices(animalTokenId)
          .call();

        tempAnimalCardArray.push({ animalTokenId, animalType, animalPrice });
      }

      setAnimalCardArray(tempAnimalCardArray);
    } catch (e) {
      console.log(e);
    }
  };

  const getIsApproveForAll = async () => {
    try {
      const response = await mintAnimalTokenContract.methods
        .isApprovedForAll(account, saleAnimalTokenAddress)
        .call();
      if (response) {
        setSaleStatus(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickApproveToggle = async () => {
    try {
      if (!account) return;
      const response = await mintAnimalTokenContract.methods
        .setApprovalForAll(saleAnimalTokenAddress, !saleStatus)
        .send({ from: account });

      if (response.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (!account) return;
    getAnimalTokens();
    getIsApproveForAll();
  }, [account]);

  return (
    <>
      <Flex alignItems="center">
        <Text display="inline-block">
          Sale Status: {saleStatus ? "True" : "False"}
        </Text>
        <Button
          size="xs"
          ml={2}
          colorScheme={saleStatus ? "red" : "blue"}
          onClick={onClickApproveToggle}
        >
          {saleStatus ? "Cancel" : "Approve"}
        </Button>
      </Flex>
      <Grid templateColumns={"repeat(4, 1fr)"} gap={8}>
        {animalCardArray &&
          animalCardArray.map((animalCard, index) => (
            <MyAnimalCard
              key={index}
              animalTokenId={animalCard.animalTokenId}
              animalType={animalCard.animalType}
              animalPrice={animalCard.animalPrice}
              saleStatus={saleStatus}
              account={account}
            />
          ))}
      </Grid>
    </>
  );
};

export default MyAnimal;
