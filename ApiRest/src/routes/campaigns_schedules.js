const express = require("express");
const router = express.Router();
const { getAllCampaign_Schedules, getCampaignSchedule, postCampaignSchedule, updateCampaignSchedule, deleteCampaignSchedule, getCampaignsByScheduleId, getSchedulesByCampaignId } = require("../controllers/campaign_scheduleController");
const { validatorCreateCampaignSchedule, validatorGetCampaignSchedulesByCampaignId, validatorGetCampaignsByScheduleId, validatorGetId } = require("../valdiators/campaign_schedules")
const { authMiddleware } = require("../middlewares/session")


router.get("/", authMiddleware, getAllCampaign_Schedules);

router.get("/:id", authMiddleware, validatorGetId, getCampaignSchedule);

router.get("/campaigns/:campaignId/schedules", authMiddleware, validatorGetCampaignSchedulesByCampaignId, getSchedulesByCampaignId);

router.get("/schedules/:scheduleId/campaigns", authMiddleware, validatorGetCampaignsByScheduleId, getCampaignsByScheduleId);

router.post("/", authMiddleware, validatorCreateCampaignSchedule, postCampaignSchedule);

router.put("/:id", authMiddleware, validatorGetId, updateCampaignSchedule);

router.delete("/:id", authMiddleware, validatorGetId, deleteCampaignSchedule);

module.exports = router;
