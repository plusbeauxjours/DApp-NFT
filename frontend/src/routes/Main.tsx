import React, { useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";

import { mintAnimalTokenContract } from "../web3Config";
import AnimalCard from "../components/AnimalCard";

interface IProps {
  account?: string;
}

const Main: React.FC<IProps> = ({ account }) => {
  const [newAnimalCard, setNewAnimalCard] = useState<string>("");

  const onClickMint = async () => {
    try {
      if (!account) return;
      const response = await mintAnimalTokenContract.methods
        .mintAnimalToken()
        .send({ from: account });

      if (response.status) {
        const balanceLength = await mintAnimalTokenContract.methods
          .balanceOf(account)
          .call();
        const animalTokenId = await mintAnimalTokenContract.methods
          .tokenOfOwnerByIndex(account, parseInt(balanceLength.length, 10) - 1)
          .call();
        const animalType = await mintAnimalTokenContract.methods
          .animalTypes(animalTokenId)
          .call();
        setNewAnimalCard(animalType);
        const owner = await mintAnimalTokenContract.methods
          .ownerOf(animalTokenId)
          .call();
        console.log("owner", owner, "account", account);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex
      w="full"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Box>
        {newAnimalCard ? (
          <AnimalCard animalType={newAnimalCard} />
        ) : (
          <Text>Let's mint AnimalCard!</Text>
        )}
      </Box>
      <Button mt={4} size="sm" colorScheme="blue" onClick={onClickMint}>
        Mint
      </Button>
    </Flex>
  );
};

export default Main;
