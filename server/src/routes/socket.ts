/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
const socketRouter = express.Router();
import socketManager from "../server-socket";
import { RequestWithUser } from "../types";

socketRouter.post("/", (req, res) => {
  // do nothing if user not logged in
  if ((req as RequestWithUser).user)
    socketManager.addUser(
      (req as RequestWithUser).user!,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      socketManager.getSocketFromSocketID(req.body.socketid)!
    );
  res.send({});
});

export default socketRouter;
