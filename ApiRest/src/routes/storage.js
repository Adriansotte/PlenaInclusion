const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { createItem, getItems, getItem, deleteItem } = require("../controllers/storageController");
const { validatorGetItem } = require("../valdiators/storages")
const { authMiddleware } = require("../middlewares/session")

// Para enviar varios archivos a la vez
// router.post('/', uploadMiddleware.single(), (req, res) => {

router.get("/", authMiddleware, getItems);

router.get("/:id", authMiddleware, validatorGetItem, getItem);

router.post("/", authMiddleware, uploadMiddleware.single("myfile"), createItem);

router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;