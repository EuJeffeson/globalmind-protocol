require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const SEPOLIA_PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "0x0000000000000000000000000000000000000000000000000000000000000001";
const SEPOLIA_RPC_URL =
  process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    localhost: { url: "http://127.0.0.1:8545" },
    sepolia: { url: SEPOLIA_RPC_URL, accounts: [SEPOLIA_PRIVATE_KEY] },
  },
  mocha: {
    require: ["ts-node/register"],
  },
};
