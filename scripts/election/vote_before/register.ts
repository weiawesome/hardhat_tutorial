import { ethers } from 'hardhat';
import {Contract} from "ethers";
import {ContractAddress} from "../parameters";

async function main() {
    const abi = require("../../../artifacts/contracts/Election.sol/Election.json").abi;

    const [deployer,user_with_index1,user_with_index2,user_with_index3,user_with_index4,user_with_index5] = await ethers.getSigners();

    console.log("User's Address: ",user_with_index1.address)

    const contractAddress = ContractAddress;

    const contract = new Contract(contractAddress, abi, user_with_index1);

    const name = 'Tcweeei-Index-1';
    const manifesto = '候選人政見';

    const depositAmount = ethers.parseEther('10');
    await contract.registerCandidate(name, manifesto, { value: depositAmount }).then((result)=>{
        console.log("Result: ",result);
        console.log('Candidate registered successfully');
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
