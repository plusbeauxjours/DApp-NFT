import React, { useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { mintAnimalTokenContract } from "../web3Config";

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
      console.log(response);
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
          <div>{newAnimalCard}</div>
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
