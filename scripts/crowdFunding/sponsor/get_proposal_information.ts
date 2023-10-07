import { ethers } from 'hardhat';
import {Contract} from "ethers";
import { ProposalContractAddress} from "../parameters";

async function main() {
    const abi = require("../../../artifacts/contracts/CrowdFunding.sol/Proposal.json").abi;

    const [deployer,user_with_index1] = await ethers.getSigners();

    console.log("User's Address: ",user_with_index1.address)

    const contractAddress = ProposalContractAddress;

    console.log("\nThe Proposal information:\n");

    const contract = new Contract(contractAddress, abi, user_with_index1);
    await contract.getTitle().then(async (result) => {
        console.log("Title: ", result);
    }).catch((e)=>{
        console.log("Error: ",e);
    })
    console.log("\n")
    await contract.getInfo().then(async (result) => {
        console.log("Information: ", result);
    }).catch((e)=>{
        console.log("Error: ",e);
    })
    await contract.getType().then(async (result) => {
        console.log("Type: ", result);
    }).catch((e)=>{
        console.log("Error: ",e);
    })
    console.log("\n");
    await contract.getPlans().then(async (result) => {
        console.log("Plans: ", result);
    }).catch((e)=>{
        console.log("Error: ",e);
    })
    console.log("\n");
    await contract.getCampaignDuration().then(async (result) => {
        console.log("CampaignDuration: ", result);
    }).catch((e)=>{
        console.log("Error: ",e);
    })
    console.log("\n");
    await contract.getAmount().then(async (result) => {
        console.log("CurrentAmount: ", result);
    }).catch((e)=>{
        console.log("Error: ",e);
    })
    await contract.getGoalAmount().then(async (result) => {
        console.log("GoalAmount: ", result);
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
