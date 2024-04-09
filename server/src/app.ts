import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import "express-async-errors";
import config from "./utils/config";

import unknownEndpoint from "./middleware/unknownEndpoints";
import errorHandler from "./middleware/errorHandler";

import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import employerRouter from "./routes/employer";
import studentRouter from "./routes/student";
import applicationRouter from "./routes/application";

const app = express();

// MONGODB connection
mongoose.set("strictQuery", false);
console.log("connecting to", config.TEST_MONGODB_URI);
mongoose
  .connect(config.TEST_MONGODB_URI as string)
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

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/employer", employerRouter);
app.use("/api/student", studentRouter);
app.use("/api/application", applicationRouter);

// Middleware
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
