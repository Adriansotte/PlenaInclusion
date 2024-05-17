const express = require("express");
const router = express.Router();
const { loginController, registerController } = require("../controllers/auth")
const { validatorRegister, validatorLogin } = require("../valdiators/auth")
const uploadMiddleware = require("../utils/handleStorage");


router.post("/register", uploadMiddleware.single("Photo"), validatorRegister, registerController);

router.post("/login", validatorLogin, loginController)

module.exports = router;