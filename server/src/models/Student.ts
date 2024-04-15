import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { InferSchemaType } from "mongoose";
import { isEmail } from "validator";

type studentSchemaInferType = InferSchemaType<typeof studentSchema>;

export const fileSchema = new mongoose.Schema({
  fileUrl: String,
  cloudinaryId: String,
  isDefault: Boolean,
});

export const createDefaultProfilePicture = () => ({
  fileUrl:
    "https://res.cloudinary.com/ddjybuw16/image/upload/v1707930194/Test/blankProfile.png",
  cloudinaryId: "Test/blankProfile.png",
  isDefault: true,
});

export const createDefaultFileSchema = () => ({
  fileUrl: "",
  cloudinaryId: "",
  isDefault: true,
});

const studentSchema = new mongoose.Schema(
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
      type: fileSchema,
      default: createDefaultProfilePicture,
    },
    resume: {
      type: [fileSchema],
      default: createDefaultFileSchema,
    },
    transcript: {
      type: fileSchema,
      default: createDefaultFileSchema,
    },
    major: {
      type: String,
      required: true,
      minlength: [3, "Must be at least 3 characters"],
    },
    classYear: {
      start: {
        type: Number,
        required: true,
        validate: {
          validator: (value: number) => {
            const currentYear = new Date().getFullYear();
            return value >= 2000 && value <= currentYear;
          },
          message:
            "Invalid start year. Must be between 2000 and the current year.",
        },
      },
      end: {
        type: Number,
        required: true,
        validate: {
          validator: function (this, value: number) {
            if (this && "classYear" in this) {
              return value >= this.classYear.start;
            }
            return false;
          },
          message: "Invalid end year. Must be greater than start year.",
        },
      },
    },
    degree: {
      type: String,
      minlength: [2, "must be at least 2 characters"],
      required: true,
    },
    accountType: {
      type: String,
      enum: {
        values: ["student"],
        message: "Invalid account type",
      },
      required: true,
    },
    savedJobs: [
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
  },
  { timestamps: true }
);

studentSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique",
});

studentSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    if ("_id" in returnedObject) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
    // the passwordHash should not be revealed
    delete returnedObject.password;
  },
});

fileSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    if ("_id" in returnedObject) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  },
});

const studentModel = mongoose.model<studentSchemaInferType>(
  "Student",
  studentSchema
);

export default studentModel;
