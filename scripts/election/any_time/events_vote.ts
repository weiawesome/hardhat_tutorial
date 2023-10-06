import {ethers} from "hardhat";
import {ContractAddress} from "../parameters";

async function main() {
    const [deployer]=await ethers.getSigners();

    const contractAddress = ContractAddress;
    const contractABI = require("../../../artifacts/contracts/Election.sol/Election.json").abi;

    const contract = new ethers.Contract(contractAddress, contractABI, deployer);

    const filter = contract.filters.VoteRecord();
    const events = await contract.queryFilter(filter);

    for (let i = 0; i < events.length; i++) {
        // @ts-ignore
        console.log("Index: ",i," Value: ",events[i].args)
    }
}

main().then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

