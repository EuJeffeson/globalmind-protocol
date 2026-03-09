const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // ⚠️ Coloque aqui o endereço do token GMND que você deployou
  const GMND_TOKEN_ADDRESS = "0x642799DA14BE72A9b8f5cF31fFbd7432CaFA97b3";

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  GlobalMind Protocol V2 — Deploy (pagamentos em GMND)");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Deployer    :", deployer.address);
  console.log("  GMND Token  :", GMND_TOKEN_ADDRESS);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("  ETH Balance :", ethers.formatEther(balance), "ETH");

  const Factory = await ethers.getContractFactory("GlobalMindProtocolV2");
  const contract = await Factory.deploy(GMND_TOKEN_ADDRESS, deployer.address);
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();

  console.log("\n✅ Protocolo V2 deployado!");
  console.log("   Endereço:", contractAddress);

  // Configura o token para reconhecer o protocolo
  console.log("\n⏳ Configurando token GMND para reconhecer o protocolo...");
  const tokenAbi = ["function setProtocolContract(address _protocol) external"];
  const token = new ethers.Contract(GMND_TOKEN_ADDRESS, tokenAbi, deployer);
  const tx = await token.setProtocolContract(contractAddress);
  await tx.wait();
  console.log("✅ Token configurado!");

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  PRÓXIMO PASSO:");
  console.log("  Atualize o frontend com o novo endereço do protocolo:");
  console.log("  CONTRACT_ADDRESS =", contractAddress);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\n  Veja no Etherscan:");
  console.log("  https://sepolia.etherscan.io/address/" + contractAddress);
}

main().catch((e) => { console.error(e); process.exit(1); });
