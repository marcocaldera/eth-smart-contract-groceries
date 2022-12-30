import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
  const GroceriesContract = await ethers.getContractFactory("Groceries");

  const contract = await GroceriesContract.deploy();
  await contract.deployed();

  return contract;
}

async function sayHello(groceries) {
  await groceries.createGroceryList([2, 5, 10, 15]);
}

deploy().then(sayHello);
