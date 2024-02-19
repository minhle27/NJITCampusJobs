import { Request, Response, NextFunction } from "express";

const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof Error) {
    console.error(error.message);
    if (error.name === "CastError") {
      return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
      return response.status(400).json({ error: error.message });
    } else if (error.name === "JsonWebTokenError") {
      return response.status(401).json({
        error: "invalid token",
      });
    } else if (error.name === "TokenExpiredError") {
      return response.status(401).json({
        error: "token expired",
      });
    }
  }

  return next(error);
};

export default errorHandler;
