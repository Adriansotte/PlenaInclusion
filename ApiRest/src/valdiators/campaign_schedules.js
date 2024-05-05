const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateCampaignSchedule = [
    check("CampaignIDCampaign").exists().notEmpty().isUUID(),
    check("ScheduleIDSchedule").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetCampaignSchedulesByCampaignId = [
    check("campaignId").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetCampaignsByScheduleId = [
    check("scheduleId").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetId = [
    check("id").exists().notEmpty().isUUID(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateCampaignSchedule, validatorGetCampaignSchedulesByCampaignId, validatorGetCampaignsByScheduleId, validatorGetId };
