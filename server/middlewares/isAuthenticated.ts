import { Response, NextFunction } from "express";
import { IUserRequest } from "../interfaces/User";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { TokenService } from "../services/Token";
const tokenService = new TokenService();

// Middleware to check if the user is logged in
export async function isAuthenticated(
  req: IUserRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Токен аутентификации недоступен" });
  }

  try {
    // Check access token
    const userData = await tokenService.validateAccessToken(
      token.split(" ")[1]
    );

    if (userData === null) {
      return res.status(401).json({ message: "Неверный токен аутентификации" });
    }

    req.user = userData;

    // The following function is carried out
    next();
  } catch (error) {
    return res.status(401).json({ message: "Неверный токен аутентификации" });
  }
}
