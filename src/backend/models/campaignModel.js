// models/campaignModel.js
const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  totalBudget: { type: Number, required: true },
  dailyBudget: { type: Number, required: true },
  imageBase64: { type: String } // This field should be a String
});

const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);

module.exports = { Campaign };

