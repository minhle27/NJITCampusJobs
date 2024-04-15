import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../types";

const populateCurUser = (req: Request, _res: Response, next: NextFunction) => {
  (req as RequestWithUser).user = req.session.user;
  next();
};

export default populateCurUser;
