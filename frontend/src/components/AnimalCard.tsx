import { Image } from "@chakra-ui/react";
import React from "react";

interface IProps {
  animalType: string;
}

const AnimalCard: React.FC<IProps> = ({ animalType }) => {
  return (
    <Image boxSize="200px" objectFit="cover" src={`images/${animalType}.jpg`} />
  );
};

export default AnimalCard;
