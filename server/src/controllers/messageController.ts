import messageModel from "../models/Message";
import { Response } from "express";
import fieldValidate from "../utils/fieldValidate";
import conversationModel from "../models/Conversation";
import socketManager from "../server-socket";
import { RequestWithUser } from "../types";

const messageController = {
  getMessageByConversation: async (req: RequestWithUser, res: Response) => {
    const messages = await messageModel.find({
      conversation: req.params.conversationId,
    });
    res.status(200).json(messages);
  },

  createNewMessage: async (req: RequestWithUser, res: Response) => {
    const body = fieldValidate.processNewMessage(req.body);
    const newMessage = new messageModel(body);
    const savedMessage = await newMessage.save();
    await conversationModel.findOneAndUpdate(
      {
        _id: body.conversation,
      },
      {
        $inc: { messageCount: 1 },
      }
    );
    const conversation = await conversationModel.findById(body.conversation);
    if (conversation && conversation.members.length >= 2) {
      const user1 = conversation.members[0];
      const user2 = conversation.members[1];
      const user1Socket = socketManager.getSocketFromUserID(user1);
      const user2Socket = socketManager.getSocketFromUserID(user2);

      if (user1Socket) {
        user1Socket.emit("message", savedMessage);
      }
      if (user2Socket) {
        user2Socket.emit("message", savedMessage);
      }
    }
    res.status(200).json(savedMessage);
  },
};

export default messageController;
