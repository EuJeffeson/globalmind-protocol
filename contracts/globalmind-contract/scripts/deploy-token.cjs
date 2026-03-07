const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  GlobalMind Protocol — Deploy GMND Token ERC-20");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Deployer :", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("  Balance  :", ethers.formatEther(balance), "ETH");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // Para o MVP, todas as carteiras são o próprio deployer.
  // Em produção: usar carteiras separadas para cada alocação.
  const deployer_address = deployer.address;

  console.log("\n  Alocações:");
  console.log("  Team wallet      :", deployer_address, "(usar multisig em produção)");
  console.log("  Reserve wallet   :", deployer_address, "(usar multisig em produção)");
  console.log("  Ecosystem wallet :", deployer_address);
  console.log("  Liquidity wallet :", deployer_address);
  console.log("  Seed wallet      :", deployer_address);

  const Factory = await ethers.getContractFactory("GMNDToken");
  const token = await Factory.deploy(
    deployer_address, // team
    deployer_address, // reserve
    deployer_address, // ecosystem
    deployer_address, // liquidity
    deployer_address  // seed
  );

  await token.waitForDeployment();
  const address = await token.getAddress();

  console.log("\n✅ Token GMND deployado com sucesso!");
  console.log("   Endereço:", address);
  console.log("\n   Distribuição inicial:");
  console.log("   400,000,000 GMND → Pool de recompensas (owner)");
  console.log("    50,000,000 GMND → Liquidez (liberado agora)");
  console.log("   100,000,000 GMND → Reserva");
  console.log("   150,000,000 GMND → Ecossistema");
  console.log("   150,000,000 GMND → Seed (vesting 6m cliff + 18m)");
  console.log("   150,000,000 GMND → Equipe (vesting 12m cliff + 36m)");
  console.log("\n   Veja no Etherscan:");
  console.log("   https://sepolia.etherscan.io/address/" + address);
  console.log("\n   ⚠️  Salve esse endereço para adicionar ao MetaMask e ao frontend!");
}

main().catch((e) => { console.error(e); process.exit(1); });
