// routes/campaignRoutes.js
const express = require('express');

const { addCampaign, getCampaigns } = require('../controllers/campaignController');

const router = express.Router();

router.post('/campaigns', addCampaign); // POST endpoint for new campaign
router.get('/campaigns', getCampaigns); // GET endpoint for campaigns list

module.exports = router;
