// @ts-ignore
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    ganache: {
      url: "http://localhost:7545",
    },
  }
};

export default config;
