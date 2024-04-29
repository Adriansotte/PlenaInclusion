const express = require("express");
const router = express.Router();
const { getAllCampaigns } = require("../controllers/capaignController");

router.get("/", getAllCampaigns);

module.exports = router;