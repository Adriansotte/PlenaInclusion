const express = require("express");
const router = express.Router();
const { getAllTypes, postType } = require("../controllers/typeController");
const { validatorCreateType } = require("../valdiators/types")

router.get("/", getAllTypes);

router.post("/", validatorCreateType, postType);

module.exports = router;