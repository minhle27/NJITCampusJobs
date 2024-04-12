import mongoose, { InferSchemaType } from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    messageCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

type conversationSchemaInferType = InferSchemaType<typeof conversationSchema>;

conversationSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    if ("_id" in returnedObject) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  },
});

const conversationModel = mongoose.model<conversationSchemaInferType>(
  "Conversation",
  conversationSchema
);

export default conversationModel;
