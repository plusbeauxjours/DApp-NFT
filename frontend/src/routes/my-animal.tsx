import { Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AnimalCard from "../components/AnimalCard";
import { mintAnimalTokenContract } from "../web3Config";

interface IProps {
  account: string;
}

const MyAnimal: React.FC<IProps> = ({ account }) => {
  const [animalCardArray, setAnimalCardArray] = useState<string[]>();

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

        tempAnimalCardArray.push(animalType);
      }

      setAnimalCardArray(tempAnimalCardArray);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!account) return;
    getAnimalTokens();
  }, [account]);

  useEffect(() => {
    console.log(animalCardArray);
  }, [animalCardArray]);

  return (
    <Grid templateColumns={"repeat(4, 1fr)"} gap={8}>
      {animalCardArray &&
        animalCardArray.map((v, i) => <AnimalCard key={i} animalType={v} />)}
    </Grid>
  );
};

export default MyAnimal;
