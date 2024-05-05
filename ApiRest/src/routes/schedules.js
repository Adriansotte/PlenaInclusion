const express = require("express");
const router = express.Router();
const { getAllSchedules, postSchedule, deleteSchedule, getSchedule, updateSchedule } = require("../controllers/scheduleController");
const { validatorCreateSchedule, validatorGetSchedule } = require("../valdiators/schedules");

router.get("/", getAllSchedules);

router.get("/:id", validatorGetSchedule, getSchedule);

router.post("/", validatorCreateSchedule, postSchedule);

router.put("/:id",validatorGetSchedule, validatorCreateSchedule, updateSchedule);

router.delete("/:id", validatorGetSchedule, deleteSchedule);

module.exports = router;