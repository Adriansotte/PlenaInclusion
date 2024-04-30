const express = require("express");
const router = express.Router();
const { getAllCampaigns, postCampaign } = require("../controllers/capaignController");
const { validatorCreateCampaign } = require("../valdiators/campaigns");

router.get("/", getAllCampaigns);
router.post("/", validatorCreateCampaign, postCampaign);

module.exports = router;