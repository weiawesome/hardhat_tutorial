import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);

  const voteTime = currentTimestampInSeconds+60*5;
  const voteTallyingTime = currentTimestampInSeconds+60*10;
  const leastVoteCount = 1;
  const basicFoundation = ethers.parseEther("10");


  const Contract = await ethers.getContractFactory("Election");
  const contract = await Contract.deploy(
      voteTime,
      voteTallyingTime,
      leastVoteCount,
      basicFoundation,
      { value: basicFoundation }
  );

  await contract.waitForDeployment();

  console.log(
      `Election with BasicFoundation: ${ethers.formatEther(basicFoundation)} ETH\nElection start in timestamp ${voteTime} vote tallying in timestamp ${voteTallyingTime} \nDeployed the contract to ${contract.target}`
  );
}

main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
