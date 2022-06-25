require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("./tasks/Block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL,
      accounts: [process.env.ACCOUNT_ID],
      chainId: 4,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: [
      //   "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      // ], by default hardhat will provide the accounts details to the networks
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  solidity: "0.8.8",
  gasReporter: {
    enabled: false,
    currency: "INR",
    outputFile: "gas-reporter.txt",
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_KEY,
    token: "MATIC", // if we deploy on polgan //for moreinfo visit https://www.npmjs.com/package/hardhat-gas-reporter // token and gasPriceApi options example
  },
};
