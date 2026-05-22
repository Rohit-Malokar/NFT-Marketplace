# NFT Marketplace

A full-stack decentralized NFT Marketplace where users can mint, buy, sell, and manage NFTs securely using blockchain technology. This project is built as a final-year engineering project with a modern Web3 architecture.

---

# Features

* User authentication and wallet connection
* Mint NFTs with metadata and images
* Buy and sell NFTs securely
* Smart contract integration using Solidity
* IPFS/File upload support
* NFT listing and marketplace management
* Responsive frontend UI
* Blockchain transaction handling
* Secure decentralized storage

---

# Tech Stack

## Frontend

* React.js
* HTML5
* CSS3
* JavaScript
* Bootstrap / Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB

## Blockchain

* Solidity
* Hardhat / Truffle
* MetaMask
* Ethereum / Polygon Network

## Storage

* IPFS
* Pinata

---

# Project Structure

```bash
NFT-Marketplace/
│
├── client/                 # Frontend files
├── server/                 # Backend APIs
├── contracts/              # Solidity smart contracts
├── scripts/                # Deployment scripts
├── uploads/                # NFT images/files
├── package.json
└── README.md
```

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/Rohit-Malokar/NFT-Marketplace.git
cd NFT-Marketplace
```

---

# Install Dependencies

## Backend

```bash
cd server
npm install
```

## Frontend

```bash
cd client
npm install
```

---

# Environment Variables

Create a `.env` file inside the backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PRIVATE_KEY=your_wallet_private_key
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
```

---

# Run the Project

## Start Backend

```bash
cd server
npm start
```

## Start Frontend

```bash
cd client
npm start
```

---

# Smart Contract Deployment

Compile contracts:

```bash
npx hardhat compile
```

Deploy contracts:

```bash
npx hardhat run scripts/deploy.js --network localhost
```


---

# API Endpoints

## Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

## NFT

* GET `/api/nft`
* POST `/api/nft/create`
* GET `/api/nft/:id`
* DELETE `/api/nft/:id`

---

# Future Enhancements

* Multi-chain NFT support
* NFT auctions
* Royalty system
* AI-generated NFT support
* NFT analytics dashboard
* Dark mode UI
* Mobile application

---

# Learning Outcomes

This project helped in understanding:

* Blockchain fundamentals
* Smart contract development
* Decentralized applications (DApps)
* Web3 integration
* Full-stack development
* Database management
* API development

---

# Contributors

## Rohit Malokar

Final Year Engineering Student

GitHub: [https://github.com/Rohit-Malokar](https://github.com/Rohit-Malokar)

---

# License

This project is developed for educational and learning purposes.

---

# Contact

For any queries or collaboration:

Email: malokarrohit2004@gmail.com
GitHub: [https://github.com/Rohit-Malokar](https://github.com/Rohit-Malokar)

---

# Conclusion

The NFT Marketplace project demonstrates the practical implementation of blockchain technology and decentralized applications. It provides users with a secure platform for trading digital assets while showcasing the integration of modern web technologies with smart contracts.
