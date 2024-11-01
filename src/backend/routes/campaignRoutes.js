// routes/campaignRoutes.js
const express = require('express');
const multer = require('multer');
const { addCampaign, getCampaigns } = require('../controllers/campaignController');

const router = express.Router();
// const upload = multer({ dest: 'uploads/' }); // save images to 'uploads' folder

router.post('/campaigns', addCampaign); // POST endpoint for new campaign
router.get('/campaigns', getCampaigns); // GET endpoint for campaigns list

module.exports = router;
