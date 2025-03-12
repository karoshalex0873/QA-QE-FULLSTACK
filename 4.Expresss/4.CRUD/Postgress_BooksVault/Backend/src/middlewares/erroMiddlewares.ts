import { Request, Response, NextFunction } from "express";

// Middleware to handle 404 Not Found errors
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Resource Not Found");
  res.status(404).json({ message: error.message });
};
