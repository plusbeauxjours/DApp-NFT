// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzepplin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintAnimalToken is ERC721Enumerable{
    constructor() ERC721('animals', 'HAS') {}   // ERC721(name, symbol)

    function mintAnimalToken() public{
        uint256 animalTOkenId = totalSupply() + 1;  // totalSupply는 지금까지 minting된 nft의 양

        _mint(msg.sender, animalTokenId); // ERC721에서 제공하는 함수. msg.sender는 mint를 요청한 사람
    }
}