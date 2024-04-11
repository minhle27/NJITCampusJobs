/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const studentRouter = express.Router();
import verifyToken from "../middleware/verifyToken";
import studentController from "../controllers/studentController";

studentRouter.get("/:id", verifyToken, studentController.getStudent);

export default studentRouter;