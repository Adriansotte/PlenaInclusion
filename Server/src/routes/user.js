import express from "express";
import { GetUsers, AddUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/getUsers', GetUsers);

userRouter.get('/addUser', AddUser);

export default userRouter;