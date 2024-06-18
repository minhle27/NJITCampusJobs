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

applicationRouter.get(
  "/post/:id",
  verifyToken,
  applicationController.getApplicationsByPost
);

applicationRouter.delete(
  "/:id",
  verifyToken,
  applicationController.withdrawApplication
);

applicationRouter.patch(
  "/:id/",
  verifyToken,
  applicationController.updateApplicationStatus
);

applicationRouter.post(
  "/",
  verifyToken,
  applicationController.createNewApplication
);

export default applicationRouter;
