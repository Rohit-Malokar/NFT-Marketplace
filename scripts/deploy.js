const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");

  const marketplace = await Marketplace.deploy();

  // ethers v5
  await marketplace.deployed();

  console.log("NFTMarketplace deployed to:", marketplace.address);

  const frontendDir = path.join(__dirname, "..", "frontend", "src");

  if (!fs.existsSync(frontendDir)) {
    fs.mkdirSync(frontendDir, { recursive: true });
  }

  const data = {
    address: marketplace.address,
    abi: marketplace.interface.format("json"),
  };

  fs.writeFileSync(
    path.join(frontendDir, "Marketplace.json"),
    JSON.stringify(data, null, 2)
  );

  console.log("Marketplace.json written to frontend/src");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});