// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("SimpleStorage");
  const greeter = await Greeter.deploy();

  // await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
  if (hre.network.config.chainId == 4 && process.env.ETHERSCAN_API_KEY) {
    await greeter.deployTransaction.wait(5);
    await verify(greeter.address, []);
  }
  const beforFavNumber = await greeter.retrieve();
  console.log(beforFavNumber);
  await greeter.store("420");
  const favNumber = await greeter.retrieve();
  console.log(favNumber);
}

async function verify(contractAddress, args) {
  try {
    console.log("verifying Contract.......");
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
