import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { InferSchemaType } from "mongoose";
import { isEmail } from "validator";

const employerSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Required"],
    },
    email: {
      type: String,
      required: [true, "Required"],
      maxlength: [50, "Must be 50 characters or less"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: [true, "User phone number required"],
      validate: {
        validator: (value: string) => {
          const phoneRegex = /^\d{10}$/;

          return phoneRegex.test(value);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid phone number!`,
      },
    },
    profileDescription: {
      type: String,
      maxlength: [279, "Must be 279 characters or less"],
    },
    profilePicture: {
      fileUrl: {
        type: String,
        default: "",
      },
      cloudinaryId: {
        type: String,
        default: "",
      },
    },
    jobPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    accountType: {
      type: String,
      enum: {
        values: ["employer"],
        message: "Invalid account type",
      },
      required: true,
    },
  },
  { timestamps: true }
);

employerSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique",
});

type employerSchemaInferType = InferSchemaType<typeof employerSchema>;

employerSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    if ("_id" in returnedObject && typeof returnedObject._id === "string") {
      returnedObject.id = returnedObject._id.toString();
    }
    // the passwordHash should not be revealed
    delete returnedObject.password;
  },
});

const employerModel = mongoose.model<employerSchemaInferType>(
  "Employer",
  employerSchema
);

export default employerModel;
