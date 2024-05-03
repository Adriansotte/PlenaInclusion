const express = require("express");
const router = express.Router();
const { getAllUsers, getUser, postUser, updateUser, deleteUser } = require("../controllers/userController");
const { validatorCreateUser, validatorGetUser } = require("../valdiators/users")
//List users
router.get("/", getAllUsers);
//Obtener un usuario
router.get("/:id", validatorGetUser, getUser);
//Crear un registro
router.post("/", validatorCreateUser, postUser);
//Actualizar registro
router.put("/:id", validatorGetUser, validatorCreateUser, updateUser);
//Borrar registro
router.delete("/:id", deleteUser);

module.exports = router;
