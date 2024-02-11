import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { InferSchemaType } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
    },
    title: {
      type: String,
      required: [true, "Required"],
      minlength: [3, "Must be at least 3 characters."],
      maxlength: [150, "Must be less than 150 characters."],
    },
    externalApplication: {
      type: String,
      validate: {
        validator: (value: string) => {
          const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
          return urlRegex.test(value);
        },
        message: "Invalid URL format.",
      },
    },
    jobDescription: {
      type: String,
      required: true,
      minlength: [10, "Must be at least 10 characters."],
    },
    location: {
      type: String,
      required: true,
      minlength: [3, "Must be at least 3 characters."],
    },
    applicants: {
      accepted: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
      ],
      pending: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
      ],
      rejected: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
      ],
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: {
        values: ["open", "close"],
        message: "Invalid status type",
      },
      default: "open",
      required: true,
    },
  },
  { timestamps: true }
);

jobSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique",
});

type jobSchemaInferType = InferSchemaType<typeof jobSchema>;

jobSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    if ("_id" in returnedObject && typeof returnedObject._id === "string") {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
    }
    // the passwordHash should not be revealed
    delete returnedObject.password;
  },
});

const jobModel = mongoose.model<jobSchemaInferType>("Job", jobSchema);

export default jobModel;
