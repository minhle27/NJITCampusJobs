/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const applicationRouter = express.Router();
import verifyToken from "../middleware/verifyToken";
import applicationController from "../controllers/applicationController";

applicationRouter.get(
  "/student/:id",
  verifyToken,
  applicationController.getStudentApplications
);

applicationRouter.patch(
  "/:id/",
  verifyToken,
  applicationController.updateApplicationStatus
);


export default applicationRouter;
