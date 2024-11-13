/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const studentRouter = express.Router();
import verifyToken from "../middleware/verifyToken";
import studentController from "../controllers/studentController";
import applicationController from "../controllers/applicationController";

studentRouter.get("/:id", verifyToken, studentController.getStudent);
studentRouter.get(
  "/:studentId/applications",
  verifyToken,
  applicationController.getStudentApplications
);

export default studentRouter;