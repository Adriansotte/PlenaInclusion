const express = require("express");
const router = express.Router();
const { getAllCampaign_Schedules, postCampaignSchedule } = require("../controllers/campaign_scheduleController");

router.get("/", getAllCampaign_Schedules);

module.exports = router;