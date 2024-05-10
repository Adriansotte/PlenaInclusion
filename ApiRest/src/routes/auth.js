const express = require("express");
const router = express.Router();
const { loginController, registerController } = require("../controllers/auth")
const { validatorRegister, validatorLogin } = require("../valdiators/auth")

router.post("/register", validatorRegister, registerController);

router.post("/login", validatorLogin, loginController)

module.exports = router;