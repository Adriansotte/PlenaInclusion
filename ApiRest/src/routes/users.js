const express = require("express");
const router = express.Router();
const { getAllUsers, getUser, postUser } = require("../controllers/userController");
const { validatorCreateUser } = require("../valdiators/users")

router.get("/", getAllUsers);
router.post("/", validatorCreateUser, postUser);

module.exports = router;
