const express = require("express");
const router = express.Router();
const { getAllUsers, getUser, postUser, updateUser, deleteUser } = require("../controllers/userController");
const { validatorCreateUser, validatorGetUser } = require("../valdiators/users")
const { authMiddleware } = require("../middlewares/session");
const uploadMiddleware = require("../utils/handleStorage");

router.get("/", authMiddleware, getAllUsers);

router.get("/:id", authMiddleware, validatorGetUser, getUser);

router.post("/", authMiddleware, validatorCreateUser, postUser);

router.put("/:id", authMiddleware, uploadMiddleware.single("Photo"), updateUser);

router.delete("/:id", authMiddleware, validatorGetUser, deleteUser);

module.exports = router;
