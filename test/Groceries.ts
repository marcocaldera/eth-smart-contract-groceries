import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardHat";
import { expect } from "chai";

const expectThrowsAsync = async (method, errorMessage) => {
  let error;
  try {
    await method();
  } catch (err) {
    error = err;
  }
  expect(error).to.be.an("Error");

  if (errorMessage) {
    expect(error.message).to.includes(errorMessage);
  }
};

describe("Groceries", function () {
  async function deployGroceriesContract() {
    const GroceryContract = await ethers.getContractFactory("Groceries");
    const contract = await GroceryContract.deploy();
    await contract.deployed();

    return contract;
  }

  let groceryContract;

  before(async function () {
    groceryContract = await deployGroceriesContract();
  });

  it("should throw the first item is too big", async () => {
    await expectThrowsAsync(
      async () => await groceryContract.createGroceryList([100, 4, 5, 10]),
      "The 1st item should be below 32"
    );
  });

  it("should throw the second item is too big", async () => {
    await expectThrowsAsync(
      async () => await groceryContract.createGroceryList([2, 100, 5, 10]),
      "The 2nd item should be below 32"
    );
  });

  it("should throw the third item is too big", async () => {
    await expectThrowsAsync(
      async () => await groceryContract.createGroceryList([2, 4, 100, 10]),
      "The 3rd item should be below 32"
    );
  });

  it("should throw the forth item is too big", async () => {
    await expectThrowsAsync(
      async () => await groceryContract.createGroceryList([2, 4, 5, 100]),
      "The 4th item should be below 32"
    );
  });

  it("should create the correct list with quantities", async function () {
    await groceryContract.createGroceryList([2, 4, 5, 10]);

    const listForAddress = (await groceryContract.getGroceries())[0];

    expect(await groceryContract.getRice(listForAddress)).to.equal(2);
    expect(await groceryContract.getEggWhite(listForAddress)).to.equal(4);
    expect(await groceryContract.getSalmon(listForAddress)).to.equal(5);
    expect(await groceryContract.getTomatoes(listForAddress)).to.equal(10);
  });
});
