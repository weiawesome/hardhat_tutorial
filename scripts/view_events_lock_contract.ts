import {ethers} from "hardhat";

async function main() {
    const [deployer]=await ethers.getSigners();

    const contractAddress = '0x3dA256b2074dB294B88535402E44652325616822';
    const contractABI = require("../artifacts/contracts/Lock.sol/Lock.json").abi;

    const contract = new ethers.Contract(contractAddress, contractABI, deployer);

    const filter = contract.filters.Withdrawal();
    const events = await contract.queryFilter(filter);

    console.log(events)
}

main().then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

