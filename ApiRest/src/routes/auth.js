const express = require("express");
const router = express.Router();
const { loginController, registerController } = require("../controllers/auth")
const { validatorRegister, validatorLogin } = require("../valdiators/auth")
const multer = require("multer");

// Configura multer para manejar formularios multipartes
const upload = multer();

router.post("/register", upload.any(), validatorRegister, registerController);

router.post("/login", validatorLogin, loginController)

module.exports = router;