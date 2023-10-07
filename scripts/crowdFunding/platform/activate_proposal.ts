import { ethers } from 'hardhat';
import {Contract} from "ethers";
import {PlatformContractAddress, ProposalContractAddress} from "../parameters";

async function main() {
    const abi = require("../../../artifacts/contracts/CrowdFunding.sol/CrowdFunding.json").abi;

    const [deployer] = await ethers.getSigners();

    console.log("User's Address: ",deployer.address)

    const contractAddress = PlatformContractAddress;

    const contract = new Contract(contractAddress, abi, deployer);

    await contract.activateProposal(ProposalContractAddress).then(async (result) => {
        console.log("Result: ", result);
        console.log('Activate the proposal successfully');
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
