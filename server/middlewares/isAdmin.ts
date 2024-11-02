import { Response, NextFunction } from "express";
import { IUserRequest } from "../interfaces/User";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// Middleware to check if the user is admin
export async function isAdmin(
  req: IUserRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Check access token
    const userData = req.user;

    if (userData?.role !== "ADMIN") {
      return res.status(403).json({ message: "Нет прав доступа" });
    }

    // The following function is carried out
    next();
  } catch (error) {
    return res.status(403).json({ message: "Нет прав доступа" });
  }
}
