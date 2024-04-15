/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const conversationRouter = express.Router();
import conversationController from "../controllers/conversationController";
import verifyToken from "../middleware/verifyToken";

conversationRouter.get(
  "/:userId",
  verifyToken,
  conversationController.getConversationByUser
);

conversationRouter.post(
  "/",
  verifyToken,
  conversationController.createConversation
);

export default conversationRouter;
