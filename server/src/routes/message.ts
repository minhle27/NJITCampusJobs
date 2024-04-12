/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const messageRouter = express.Router();
import conversationController from "../controllers/conversationController";
import verifyToken from "../middleware/verifyToken";

messageRouter.post(
  "/",
  verifyToken,
  conversationController.getConversationByUser
);

messageRouter.get(
  "/:conversationId",
  verifyToken,
  conversationController.createConversation
);

export default messageRouter;
