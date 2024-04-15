/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const messageRouter = express.Router();
import messageController from "../controllers/messageController";
import verifyToken from "../middleware/verifyToken";

messageRouter.post(
  "/",
  verifyToken,
  messageController.createNewMessage
);

messageRouter.get(
  "/conversation/:conversationId",
  verifyToken,
  messageController.getMessageByConversation
);

export default messageRouter;
