const express = require("express");
const router = express.Router();
const { getAllCampaigns, postCampaign, deleteCampaign, getCampaign, updateCampaign } = require("../controllers/capaignController");
const { validatorCreateCampaign, validatorGetCampaing } = require("../valdiators/campaigns");

router.get("/", getAllCampaigns);

router.get("/:id", validatorGetCampaing, getCampaign);

router.post("/", validatorCreateCampaign, postCampaign);

router.put("/:id", validatorGetCampaing, validatorCreateCampaign, updateCampaign);

router.delete("/:id", validatorGetCampaing, deleteCampaign);

module.exports = router;