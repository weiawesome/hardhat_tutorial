import { ethers } from 'hardhat';
import {Contract} from "ethers";
import {PlatformContractAddress} from "../parameters";

async function main() {
    const abi = require("../../../artifacts/contracts/CrowdFunding.sol/CrowdFunding.json").abi;

    const [deployer] = await ethers.getSigners();

    console.log("User's Address: ",deployer.address)

    const contractAddress = PlatformContractAddress;

    const contract = new Contract(contractAddress, abi, deployer);
    const amount = ethers.parseEther("10");
    const title="Tcweeei Proposal Title"

    await contract.propose(title,{ value: amount }).then(async (result) => {
        console.log("Result: ", result);
        console.log('Submit the proposal successfully');
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
