import { ethers } from 'hardhat';
import {Contract} from "ethers";
import {ContractAddress} from "../parameters";

async function main() {
    const abi = require("../../../artifacts/contracts/Election.sol/Election.json").abi;

    const [deployer] = await ethers.getSigners();

    const contractAddress = ContractAddress;

    const contract = new Contract(contractAddress, abi, deployer);

    await contract.revealVotes().then((result)=>{
        console.log("Result: ",result)
        console.log('Reveal votes successfully');
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
