const express = require("express");
const router = express.Router();
const { getAllSchedules, postSchedule } = require("../controllers/scheduleController");
const { validatorCreateSchedule } = require("../valdiators/schedules");

router.get("/", getAllSchedules);
router.post("/", validatorCreateSchedule, postSchedule);

module.exports = router;