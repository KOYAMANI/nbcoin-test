const hre = require("hardhat");

async function main() {

  const NBCoin = await hre.ethers.getContractFactory("NBCoin");
  const nbcoin = await NBCoin.deploy();
  await nbcoin.deployed();
  console.log("NBCoin deployed to:", nbcoin.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
