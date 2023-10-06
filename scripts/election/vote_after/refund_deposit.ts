import { ethers } from 'hardhat';
import {Contract} from "ethers";
import {ContractAddress} from "../parameters";

async function main() {
    const abi = require("../../../artifacts/contracts/Election.sol/Election.json").abi;

    const [deployer,user_with_index1] = await ethers.getSigners();

    console.log("User's Address: ",deployer.address)

    const contractAddress = ContractAddress;

    const contract = new Contract(contractAddress, abi, user_with_index1);

    await contract.refundDeposit().then((result)=>{
        console.log("Result: ",result);
        console.log('Refund deposit successfully');
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
