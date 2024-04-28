const express = require("express");
const router = express.Router();
const { getAllSchedules } = require("../controllers/scheduleController");

router.get("/", getAllSchedules);

module.exports = router;