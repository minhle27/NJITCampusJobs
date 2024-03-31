import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../utils/config";

export interface AuthenticatedRequest extends Request {
  user?: string;
}

const getTokenFrom = (req: Request) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = getTokenFrom(req);
  if (!token) {
    return res.status(401).json("You're not authenticated");
  }
  const decodedToken = jwt.verify(token, config.SECRET as string) as { id?: string };
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }
  req.user = decodedToken.id;
  return next();
};

export default verifyToken;
