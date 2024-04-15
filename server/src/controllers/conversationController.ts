import conversationModel from "../models/Conversation";
import { Response } from "express";
import { RequestWithUser } from "../types";

const conversationController = {
  getConversationByUser: async (req: RequestWithUser, res: Response) => {
    const conversation = await conversationModel.find({
      members: { $in: [req.params.userId] },
    });
    return res.status(200).json(conversation);
  },

  createConversation: async (req: RequestWithUser, res: Response) => {
    const newConversation = new conversationModel({
      members: [req.body.senderId, req.body.receiverId],
    });
    const savedConversation = await newConversation.save();
    return res.status(200).json(savedConversation);
  },
};

export default conversationController;
