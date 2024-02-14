import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";w
import "express-async-errors";
import config from "./utils/config";

import unknownEndpoint from "./middleware/unknownEndpoints";

const app = express();

// MONGODB connection
mongoose.set("strictQuery", false);
console.log("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI as string)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error: unknown) => {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.error("error connecting to MongoDB:", errorMessage);
  });

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use(unknownEndpoint);

export default app;
