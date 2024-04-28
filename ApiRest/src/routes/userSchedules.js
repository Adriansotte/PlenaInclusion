const express = require("express");
const router = express.Router();
const { getAllUser_Schedules } = require("../controllers/user_scheduleController");

router.get("/", getAllUser_Schedules);

module.exports = router;