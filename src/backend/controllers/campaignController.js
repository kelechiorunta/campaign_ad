// controllers/campaignController.js
const { Campaign } = require('../models/campaignModel');

// Add a new campaign
// controllers/campaignController.js
exports.addCampaign = async (req, res) => {
  const { name, from, to, totalBudget, dailyBudget, imageBase64 } = req.body; // `imageBase64` should be part of the request body

  // Console the image string
  console.log("Received imageBase64:", imageBase64);

  try {
    const newCampaign = new Campaign({ name, from, to, totalBudget, dailyBudget, imageBase64 });
    await newCampaign.save();
    res.status(201).json({ message: "Campaign added successfully", campaign: newCampaign });
  } catch (error) {
    console.error("Error saving campaign:", error);
    res.status(500).json({ error: "Failed to add campaign" });
  }
};


// List all campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const allCampaigns = await Campaign.find();
    res.status(200).json({ campaigns: allCampaigns });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch campaigns" });
  }
};

