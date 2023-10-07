import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("CrowdFunding");

  await lock.waitForDeployment();

  console.log(
    `The CrowdFunding platform is deployed to ${lock.target}`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
