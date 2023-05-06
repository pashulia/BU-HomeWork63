// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const Example1 = await ethers.getContractFactory("Example1");
  const example1 = await Example1.deploy();

  console.log("Адрес контракта Example1: ", example1.address );

  const Example2 = await ethers.getContractFactory("Example2");
  const example2 = await Example2.deploy(example1.address);

  console.log("Адрес контракта Example2: ", example2.address );

  console.log( "\n === setNumber Example1 === \n");
  await example1.setNumber(1);
  console.log(await example1.getNumber());

  console.log( "\n === setNumber Example2 === \n");
  await example2.setNumber(2);
  console.log(await example2.getNumber());

  console.log( "\n === setStr Example1 === \n");
  await example1.setStr("hi");
  console.log(await example1.getStr());

  console.log( "\n === setStr Example2 === \n");
  await example2.setStr("hello");
  console.log(await example2.getStr());

  const wallet = ethers.Wallet.createRandom();
  console.log(wallet);
  await hre.network.provider.send("hardhat_setBalance", [
    wallet.address,
    "0x1000"
  ]);

  await hre.network.provider.send("hardhat_setBalance", [
    example1.address,
    "0x1000"
  ]);

  const contractBal = await ethers.provider.getBalance(wallet.address);
  console.log(contractBal);

  const res = await example1.sendEth(wallet.address, 500);
  console.log(res);

  const res2 = await example2.sendEth(wallet.address, 500);
  console.log(res2);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
