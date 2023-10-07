import { ethers } from 'hardhat';
import {Contract} from "ethers";
import { ProposalContractAddress} from "../parameters";

async function main() {
    const abi = require("../../../artifacts/contracts/CrowdFunding.sol/Proposal.json").abi;

    const [deployer] = await ethers.getSigners();

    console.log("User's Address: ",deployer.address)

    const contractAddress = ProposalContractAddress;

    const contract = new Contract(contractAddress, abi, deployer);

    const proposalInformation="This is the information ot introduction to the proposal.\nMade by Tcweeei.";

    await contract.editInfo(proposalInformation).then(async (result) => {
        console.log('Update the personal information successfully');
    }).catch((e)=>{
        console.log("Error: ",e);
    })

    const amount = ethers.parseEther("10");

    await contract.editGoalAmount(amount).then(async (result) => {
        console.log('Edit the goal amount with ',amount,'successfully');
    }).catch((e)=>{
        console.log("Error: ",e);
    })

    const currentTimestamp = Math.round(Date.now() / 1000);
    const campaignDuration=currentTimestamp+60*10;

    await contract.editCampaignDuration(campaignDuration).then(async (result) => {
        console.log('Update Campaign Duration with ',campaignDuration,' successfully');
    }).catch((e)=>{
        console.log("Error: ",e);
    })

    const pt=3; // RewardBased
    const pr=0; // Social
    const pc=1; // ForProposer

    await contract.editType(pt,pr,pc).then(async (result) => {
        console.log('Update the type successfully');
    }).catch((e)=>{
        console.log("Error: ",e);
    })

    const title="方案一"
    const content="This is a plan need to 10 ETH and limit to 10.";
    const quantity=10
    const price = ethers.parseEther("10");

    await contract.editPlan(title,content,quantity,price).then(async (result) => {
        console.log('Add the plan with title ',title,' successfully');
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
