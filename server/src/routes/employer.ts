/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const employerRouter = express.Router();
import verifyToken from "../middleware/verifyToken";
import employerController from "../controllers/employerController";

employerRouter.get("/:id", verifyToken, employerController.getEmployer);

export default employerRouter;