const express = require("express");
const router = express.Router();
const { getAllUsers, getUser, postUser, updateUser, deleteUser } = require("../controllers/userController");
const { validatorCreateUser, validatorGetUser } = require("../valdiators/users")

router.get("/", getAllUsers);

router.get("/:id", validatorGetUser, getUser);

router.post("/", validatorCreateUser, postUser);

router.put("/:id", validatorGetUser, validatorCreateUser, updateUser);

router.delete("/:id", validatorGetUser, deleteUser);

module.exports = router;
