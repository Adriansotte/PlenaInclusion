const express = require("express");
const router = express.Router();
//const { getAllUsers } = require("../controllers/userController");

router.get("/", (req, res) => {
    const data = ["hola", "mundo"]
    res.send({data});
});

module.exports = router;
