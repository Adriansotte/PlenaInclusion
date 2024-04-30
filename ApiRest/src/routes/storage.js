const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { createItem } = require("../controllers/storageController");


// Para enviar varios archivos a la vez
// router.post('/', uploadMiddleware.single(), (req, res) => {

router.post('/', uploadMiddleware.single("myfile"), createItem);


module.exports = router;