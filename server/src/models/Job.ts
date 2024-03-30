import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { InferSchemaType } from "mongoose";

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  resumeUrl: {
    type: String,
  },
});

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
      accepted: [applicationSchema],
      pending: [applicationSchema],
      rejected: [applicationSchema],
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
    if ("_id" in returnedObject) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  },
});

const jobModel = mongoose.model<jobSchemaInferType>("Job", jobSchema);

export default jobModel;
