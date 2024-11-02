import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IGenerateToken } from "../interfaces/Token";

dotenv.config({ path: "../.env" });

// Service for managing tokens
export class TokenService {
  // Generating access token service
  async generateAccessToken(options: IGenerateToken) {
    const { id, email, role, loggedWith } = options;

    const payload = {
      id,
      email,
      role,
      loggedWith,
    };

    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "1h",
    });
  }

  // Generating refresh token service
  async generateRefreshToken(options: IGenerateToken) {
    const { id, email, role, loggedWith } = options;

    const payload = {
      id,
      email,
      role,
      loggedWith,
    };

    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "7d",
    });
  }

  // Validating refresh token service
  async validateRefreshToken(refreshToken: string) {
    try {
      const userData = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as IGenerateToken;

      return userData;
    } catch (e) {
      return null;
    }
  }

  // Validating access token service
  async validateAccessToken(accessToken: string) {
    try {
      const userData = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET!
      ) as IGenerateToken;

      return userData;
    } catch (e) {
      return null;
    }
  }
}
