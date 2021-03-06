// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "SaleAnimalToken.sol";

contract MintAnimalToken is ERC721Enumerable{
    constructor() ERC721('animals', 'HAS') {}   // ERC721(name, symbol)

    SaleAnimalToken public saleAnimalToken;

    mapping(uint256 => uint256) public animalTypes; //  앞의 unit256은 animalTokenId, 뒤의 unit256은 animalTypes. tokenId를 넣으면 types가 나온다.

    struct AnimalTokenData {
        uint256 animalTokenId;
        uint256 animalType;
        uint256 animalPrice;
    }

    function mintAnimalToken() public{
        uint256 animalTokenId = totalSupply() + 1;  // totalSupply는 지금까지 minting된 nft의 양

        uint256 animalType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, animalTokenId))) % 5 + 1; // 겹치지 않는 랜덤값이 나온다.

        animalTypes[animalTokenId] = animalType;

        _mint(msg.sender, animalTokenId); // ERC721에서 제공하는 함수. msg.sender는 mint를 요청한 사람
    }

    function getAnimalTokens(address _animalTokenOwner) view public returns (AnimalTokenData[] memory) {
        uint256 balanceLength = balanceOf(_animalTokenOwner);

        require(balanceLength =0, 'Owner did not have token.');

        AnimalTokenData[] memory animalTokenData = new AnimalTokenData[](balanceLength);

        for(uint256 i=0; i < balanceLength; i++){
            uint256 animalTokenId = tokenOfOwnerByIndex(_animalTokenOwner,i);
            uint256 animalType = animalTypes[animalTokenId];
            uint256 animalPrice = saleAnimalToken.getAnimalTokenPrice(animalTokenId);

            animalTokenData[i] = AnimalTokenData(animalTokenId, animalType, animalPrice);
        }

        return animalTokenData;
    }

    function setSaleAnimalToken(address _saleAnimalToken) public {
        saleAnimalToken = SaleAnimalToken(_saleAnimalToken);
    }
}
