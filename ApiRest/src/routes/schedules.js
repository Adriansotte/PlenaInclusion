const express = require("express");
const router = express.Router();
const { getAllSchedules, postSchedule, deleteSchedule, getSchedule, updateSchedule } = require("../controllers/scheduleController");
const { validatorCreateSchedule, validatorGetSchedule } = require("../valdiators/schedules");
const { authMiddleware } = require("../middlewares/session")

router.get("/", authMiddleware, getAllSchedules);

router.get("/:id", authMiddleware, validatorGetSchedule, getSchedule);

router.post("/", authMiddleware, validatorCreateSchedule, postSchedule);

router.put("/:id", authMiddleware, validatorGetSchedule, validatorCreateSchedule, updateSchedule);

router.delete("/:id", authMiddleware, validatorGetSchedule, deleteSchedule);

module.exports = router;