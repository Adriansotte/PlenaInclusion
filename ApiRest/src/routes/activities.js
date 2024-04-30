const express = require("express");
const router = express.Router();
const { getAllActivities, postActivity } = require("../controllers/activityController");
const { validatorCreateActivity } = require("../valdiators/activities");

router.get("/", getAllActivities);
router.post("/", validatorCreateActivity, postActivity);

module.exports = router;