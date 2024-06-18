/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const uploadFileRouter = express.Router();
import verifyToken from "../middleware/verifyToken";
import uploadController from "../controllers/uploadController";

uploadFileRouter.post("/", verifyToken, uploadController);

export default uploadFileRouter;
