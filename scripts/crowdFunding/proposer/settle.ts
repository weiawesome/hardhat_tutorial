import { ethers } from 'hardhat';
import {Contract} from "ethers";
import { ProposalContractAddress} from "../parameters";

async function main() {
    const abi = require("../../../artifacts/contracts/CrowdFunding.sol/Proposal.json").abi;

    const [deployer] = await ethers.getSigners();

    console.log("User's Address: ",deployer.address)

    const contractAddress = ProposalContractAddress;

    const contract = new Contract(contractAddress, abi, deployer);

    await contract.settleProposal().then(async (result) => {
        console.log('Settle successfully');
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
