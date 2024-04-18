import mongoose, { InferSchemaType } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    sender: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

type messageSchemaInferType = InferSchemaType<typeof messageSchema>;

messageSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    if ("_id" in returnedObject) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  },
});

const messageModel = mongoose.model<messageSchemaInferType>(
  "Message",
  messageSchema
);

export default messageModel;
