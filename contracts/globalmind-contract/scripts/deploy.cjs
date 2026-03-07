const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  GlobalMind Protocol — Deploy");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Deployer :", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("  Balance  :", ethers.formatEther(balance), "ETH");

  const Factory = await ethers.getContractFactory("GlobalMindProtocol");
  const contract = await Factory.deploy(deployer.address);
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("\n✅ Contrato deployado!");
  console.log("   Endereço:", address);
  console.log("\n   Veja no Etherscan:");
  console.log("   https://sepolia.etherscan.io/address/" + address);
}

main().catch((e) => { console.error(e); process.exit(1); });
