const express = require("express");
const router = express.Router();
const { getAllUser_Schedules, postUser_Schedule, deleteUserSchedule, getSchedulesByUserId, getUserSchedule, getUsersByScheduleId, updateUserSchedule } = require("../controllers/user_scheduleController");
const { validatorCreateUserSchedule, validatorGetId, validatorGetScheduleId, validatorGetUserId } = require("../valdiators/user_schedules");

router.get("/", getAllUser_Schedules);

router.get("/:id", validatorGetId, getUserSchedule);

router.get("/schedules/:scheduleId/users", validatorGetScheduleId, getUsersByScheduleId);

router.get("/users/:userId/schedules", validatorGetUserId, getSchedulesByUserId);

router.post("/", validatorCreateUserSchedule, postUser_Schedule);

router.put("/:id", validatorGetId, updateUserSchedule);

router.delete("/:id", validatorGetId, deleteUserSchedule);

module.exports = router;