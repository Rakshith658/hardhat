const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  // let SimpleStorage
  // let simpleStorage
  let SimpleStorage, simpleStorage;
  beforeEach(async () => {
    SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
  });
  it("Should return the new Number  once it's changed", async function () {
    expect(await simpleStorage.retrieve()).to.equal("0");

    const setGreetingTx = await simpleStorage.store("420");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    assert((await simpleStorage.retrieve()) == "420");
    // const data = await simpleStorage.retrieve();
    // assert.equal((data).toString(), "420");
    assert.equal((await simpleStorage.retrieve()).toString(), "420");
  });
  it("Should return the new Number 0", async function () {
    expect(await simpleStorage.retrieve()).to.equal("0");
  });
  it("Should return the new addPerson data", async function () {
    await simpleStorage.addPerson("rakshith kumar s", 7);
    await simpleStorage.addPerson("anu", 123);
    const data = await simpleStorage.people(0);
    assert(data[0] == "7");
  });
});
