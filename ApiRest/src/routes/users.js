const express = require("express");
const router = express.Router();
const { getAllUsers, getUser, postUser } = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/", postUser);

module.exports = router;
