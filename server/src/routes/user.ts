/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const userRouter = express.Router();
import verifyToken from "../middleware/verifyToken";
import userController from "../controllers/userController";

userRouter.get("/:id", verifyToken, userController.getUserById);

export default userRouter;