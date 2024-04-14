import conversationModel from "../models/Conversation";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { Response } from "express";
import mongoose from "mongoose";

const conversationController = {
  getConversationByUser: async (req: AuthenticatedRequest, res: Response) => {
    const conversation = await conversationModel.find({
      members: { $in: [new mongoose.Types.ObjectId(req.params.userId)] },
    });
    return res.status(200).json(conversation);
  },

  createConversation: async (req: AuthenticatedRequest, res: Response) => {
    const newConversation = new conversationModel({
      members: [req.body.senderId, req.body.receiverId],
    });
    const savedConversation = await newConversation.save();
    return res.status(200).json(savedConversation);
  },
};

export default conversationController;
