import { ethers } from 'hardhat';
import {Contract} from "ethers";
import { ProposalContractAddress} from "../parameters";

async function main() {
    const abi = require("../../../artifacts/contracts/CrowdFunding.sol/Proposal.json").abi;

    const [deployer,user_with_index1] = await ethers.getSigners();

    console.log("User's Address: ",user_with_index1)

    const contractAddress = ProposalContractAddress;

    const contract = new Contract(contractAddress, abi, user_with_index1);

    const amount = ethers.parseEther("10");
    const title="方案一"

    await contract.backPlan(title,{value:amount}).then(async (result) => {
        console.log("Result: ", result);
        console.log('Back the plan successfully');
    }).catch((e)=>{
        console.log("Error: ",e);
    })
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
