import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import employerModel from "../models/Employer";
import studentModel from "../models/Student";
import { RequestWithUser, UserWithId } from "../types";

const getTokenFrom = (req: Request) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const verifyToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = getTokenFrom(req);
  if (!token) {
    return res.status(401).json("You're not authenticated");
  }
  const decodedToken = jwt.verify(token, config.SECRET as string) as {
    id?: string;
  };
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  let user;
  const employer = await employerModel.findById(decodedToken.id);
  if (employer) user = employer;
  else {
    const student = await studentModel.findById(decodedToken.id);
    if (student) user = student;
  }

  if (!user) {
    return res.status(401).json({ error: "Invalid user" });
  }

  const loggedinUser = { ...user, _id: user._id.toString() };
  req.user = loggedinUser as unknown as UserWithId;
  return next();
};

export default verifyToken;
