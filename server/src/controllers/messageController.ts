import messageModel from "../models/Message";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { Response } from "express";
import fieldValidate from "../utils/fieldValidate";
import conversationModel from "../models/Conversation";

const messageController = {
  getMessageByConversation: async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    const messages = await messageModel.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  },

  createNewMessage: async (req: AuthenticatedRequest, res: Response) => {
    const body = fieldValidate.processNewMessage(req.body);
    const newMessage = new messageModel(body);
    const savedMessage = await newMessage.save();
    await conversationModel.findOneAndUpdate(
      {
        _id: body.conversationId,
      },
      {
        $inc: { messageCount: 1 },
      }
    );
    res.status(200).json(savedMessage);
  },
};

export default messageController;
