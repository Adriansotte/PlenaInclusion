const express = require("express");
const router = express.Router();
const { getAllActivities, postActivity, getActivity, deleteActivity, updateActivity } = require("../controllers/activityController");
const { validatorCreateActivity, validatorGetActivity } = require("../valdiators/activities");

router.get("/", getAllActivities);

router.get("/:id", validatorGetActivity, getActivity);

router.post("/", validatorCreateActivity, postActivity);

router.put("/:id", validatorGetActivity, validatorCreateActivity, updateActivity);

router.delete("/:id", validatorGetActivity, deleteActivity);

module.exports = router;