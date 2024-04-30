const express = require("express");
const router = express.Router();
const { getAllUser_Schedules, postUser_Schedule } = require("../controllers/user_scheduleController");
const { validatorCreateUserSchedule } = require("../valdiators/user_schedules");

router.get("/", getAllUser_Schedules);
router.post("/", validatorCreateUserSchedule, postUser_Schedule);

module.exports = router;