import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import "express-async-errors";
import config from "./utils/config";
import session from "express-session";
import { UserWithId } from "./types";

import unknownEndpoint from "./middleware/unknownEndpoints";
import errorHandler from "./middleware/errorHandler";
import populateCurUser from "./middleware/populateCurUser";

import authRouter from "./routes/auth";
import postRouter from "./routes/post";
import employerRouter from "./routes/employer";
import studentRouter from "./routes/student";
import applicationRouter from "./routes/application";
import conversationRouter from "./routes/conversation";
import messageRouter from "./routes/message";
import userRouter from "./routes/user";
import socketRouter from "./routes/socket";

declare module "express-session" {
  interface SessionData {
    user: UserWithId;
  }
}

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

app.use(
  session({
    secret: "cat cute",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(populateCurUser);

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
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);
app.use("/api/initsocket", socketRouter);

// Middleware
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
