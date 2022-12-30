// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Groceries {

    mapping(address => uint[]) addressToGroceries;

    function getRice(uint shoppingList) public pure returns (uint) {
        return (shoppingList >> 0) & 0x1F;
    }

    function getEggWhite(uint shoppingList) public pure returns (uint) {
        return (shoppingList >> 5) & 0x1F;
    }

    function getSalmon(uint shoppingList) public pure returns (uint) {
        return (shoppingList >> 10) & 0x1F;
    }

    function getTomatoes(uint shoppingList) public pure returns (uint) {
        return (shoppingList >> 15) & 0x1F;
    }

    function getGroceries() public view returns (uint[] memory) {
        return addressToGroceries[msg.sender];
    }

    function createGroceryList(uint[4] memory shoppingList) public payable {

        require(shoppingList[0] <= 31, "The 1st item should be below 32");
        require(shoppingList[1] <= 31, "The 2nd item should be below 32");
        require(shoppingList[2] <= 31, "The 3rd item should be below 32");
        require(shoppingList[3] <= 31, "The 4th item should be below 32");

        uint groceries = 0;
        uint index = 0;

        do {
            groceries |= shoppingList[index] << 5 * index;
            index++;
        } while (shoppingList.length > index);

        addressToGroceries[msg.sender].push(groceries);
    }
}
