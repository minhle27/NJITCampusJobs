/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const presignedUrlRouter = express.Router();
import verifyToken from "../middleware/verifyToken";
import signedUrlController from "../controllers/signedUrlController";

presignedUrlRouter.get("/", verifyToken, signedUrlController);

export default presignedUrlRouter;
