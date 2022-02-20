import { Image } from "@chakra-ui/react";
import React from "react";

interface IProps {
  animalType: string;
}

const AnimalCard: React.FC<IProps> = ({ animalType }) => {
  return <Image src={`images/${animalType}.jpg`} />;
};

export default AnimalCard;
