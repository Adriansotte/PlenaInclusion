const express = require("express");
const router = express.Router();
const { getAllCampaign_Schedules, getCampaignSchedule, postCampaignSchedule, updateCampaignSchedule, deleteCampaignSchedule, getCampaignsByScheduleId, getSchedulesByCampaignId } = require("../controllers/campaign_scheduleController");
const { validatorCreateCampaignSchedule, validatorGetCampaignSchedulesByCampaignId, validatorGetCampaignsByScheduleId, validatorGetId } = require("../valdiators/campaign_schedules")

router.get("/", getAllCampaign_Schedules);

router.get("/:id", validatorGetId, getCampaignSchedule);

router.get("/campaigns/:campaignId/schedules", validatorGetCampaignSchedulesByCampaignId, getSchedulesByCampaignId);

router.get("/schedules/:scheduleId/campaigns", validatorGetCampaignsByScheduleId, getCampaignsByScheduleId);

router.post("/", validatorCreateCampaignSchedule, postCampaignSchedule);

router.put("/:id", validatorGetId, updateCampaignSchedule);

router.delete("/:id", validatorGetId, deleteCampaignSchedule);

module.exports = router;
