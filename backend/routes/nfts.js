const express = require("express");
const router = express.Router();
const NFT = require("../models/NFT");
const jwt = require("jsonwebtoken");

// Auth middleware
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authorization required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

// Mint NFT
router.post("/mint", authMiddleware, async (req, res) => {
  try {
    const {
      tokenId,
      name,
      description,
      image,
      price,
      walletAddress,
      transactionHash,
      contractAddress,
    } = req.body;

    if (!tokenId || !name || !image || !walletAddress) {
      return res.status(400).json({
        message: "Missing required NFT fields",
      });
    }

    const existing = await NFT.findOne({
      tokenId,
      contractAddress,
    });

    if (existing) {
      return res.status(400).json({
        message: "NFT with this tokenId already exists",
      });
    }

    const nft = new NFT({
      tokenId,
      name,
      description,
      image,
      price: price || 0,
      owner: walletAddress,
      creator: walletAddress,
      transactionHash,
      contractAddress,
      isListed: false,
    });

    await nft.save();

    res.status(201).json({
      message: "NFT minted and saved",
      nft,
    });
  } catch (error) {
    console.error("Mint error:", error);

    res.status(500).json({
      message: "Server error during NFT save",
    });
  }
});

// Get all NFTs
router.get("/all", async (req, res) => {
  try {
    const nfts = await NFT.find().sort({ createdAt: -1 });

    res.json(nfts);
  } catch (error) {
    console.error("Fetch all NFTs error:", error);

    res.status(500).json({
      message: "Error fetching NFTs",
    });
  }
});

// Marketplace NFTs
router.get("/marketplace", async (req, res) => {
  try {
    const nfts = await NFT.find({
      isListed: true,
    }).sort({ createdAt: -1 });

    res.json(nfts);
  } catch (error) {
    console.error("Marketplace fetch error:", error);

    res.status(500).json({
      message: "Error fetching marketplace NFTs",
    });
  }
});

// User NFTs
router.get("/my-nfts/:walletAddress", async (req, res) => {
  try {
    const nfts = await NFT.find({
      owner: req.params.walletAddress,
    });

    res.json(nfts);
  } catch (error) {
    console.error("My NFTs fetch error:", error);

    res.status(500).json({
      message: "Error fetching user NFTs",
    });
  }
});

// List NFT for sale
router.put("/list/:tokenId", authMiddleware, async (req, res) => {
  try {
    const { price } = req.body;

    const nft = await NFT.findOneAndUpdate(
      {
        tokenId: req.params.tokenId,
      },
      {
        isListed: true,
        price,
      },
      {
        new: true,
      }
    );

    res.json({
      message: "NFT listed for sale",
      nft,
    });
  } catch (error) {
    console.error("List NFT error:", error);

    res.status(500).json({
      message: "Error listing NFT",
    });
  }
});

// Transfer NFT ownership
router.put("/transfer/:tokenId", async (req, res) => {
  try {
    const { newOwner, transactionHash } = req.body;

    const nft = await NFT.findOneAndUpdate(
      {
        tokenId: req.params.tokenId,
      },
      {
        owner: newOwner,
        isListed: false,
        transactionHash,
      },
      {
        new: true,
      }
    );

    res.json({
      message: "NFT ownership transferred",
      nft,
    });
  } catch (error) {
    console.error("Transfer NFT error:", error);

    res.status(500).json({
      message: "Error transferring NFT",
    });
  }
});

module.exports = router;