const express = require("express");
const router = express.Router();
const { getAllUser_Schedules, postUser_Schedule, deleteUserSchedule, getSchedulesByUserId, getUserSchedule, getUsersByScheduleId, updateUserSchedule } = require("../controllers/user_scheduleController");
const { validatorCreateUserSchedule, validatorGetId, validatorGetScheduleId, validatorGetUserId } = require("../valdiators/user_schedules");
const { authMiddleware } = require("../middlewares/session")

router.get("/", authMiddleware, getAllUser_Schedules);

router.get("/:id", authMiddleware, validatorGetId, getUserSchedule);

router.get("/schedules/:scheduleId/users", authMiddleware, validatorGetScheduleId, getUsersByScheduleId);

router.get("/users/:userId/schedules", authMiddleware, validatorGetUserId, getSchedulesByUserId);

router.post("/", authMiddleware, validatorCreateUserSchedule, postUser_Schedule);

router.put("/:id", authMiddleware, validatorGetId, updateUserSchedule);

router.delete("/:id", authMiddleware, validatorGetId, deleteUserSchedule);

module.exports = router;