const express = require("express");
const router = express.Router();
const { getAllActivities, postActivity, getActivity, deleteActivity, updateActivity } = require("../controllers/activityController");
const { validatorCreateActivity, validatorGetActivity } = require("../valdiators/activities");
const { authMiddleware } = require("../middlewares/session")


router.get("/", authMiddleware, getAllActivities);

router.get("/:id", authMiddleware, validatorGetActivity, getActivity);

router.post("/", authMiddleware, validatorCreateActivity, postActivity);

router.put("/:id", authMiddleware, validatorGetActivity, validatorCreateActivity, updateActivity);

router.delete("/:id", authMiddleware, validatorGetActivity, deleteActivity);

module.exports = router;