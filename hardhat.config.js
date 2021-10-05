require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      // chainId: 1337
    },
    bscTest: {
      url: "https://data-seed-prebsc-2-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      //***private key MUST NOT be exposed, ONLY FOR TESTING PURPOSE***
      accounts: [`2316c6b10e614351c9948c375769e4322b331edd84539d92f44e638a497b1ae3`]//Metamask
    },
    genache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
    },
    ropsten:{
      url: "https://ropsten.infura.io/v3/37367d5dd986442faf0a4a8bc59ce5b9",
      accounts: [`0x${process.env.ACCOUNT_KEY}`]
    }
  }
};

