const express = require("express");
const router = express.Router();
const { getAllTypes, postType, getType, deleteType, updateType } = require("../controllers/typeController");
const { validatorCreateType, validatorGetType } = require("../valdiators/types");

router.get("/", getAllTypes);

router.get("/:id", validatorGetType, getType);

router.post("/", validatorCreateType, postType);

router.put("/:id", validatorGetType, validatorCreateType, updateType );

router.delete("/:id", deleteType);

module.exports = router;