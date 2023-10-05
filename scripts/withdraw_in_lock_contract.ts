import {ethers} from "hardhat";
import { Contract } from "ethers";

async function main() {
    const abi = require("../artifacts/contracts/Lock.sol/Lock.json").abi;

    const [deployer,user_with_index1] = await ethers.getSigners();

    console.log("User's Address: ",deployer.address)

    const contractAddress = '0x3dA256b2074dB294B88535402E44652325616822';

    const contract = new Contract(contractAddress, abi, deployer);

    await contract.withdraw().then((result)=>{
        console.log("Result: ", result);
    }).catch((e)=>{
        console.log("Error: ",e)
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });