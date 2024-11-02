import { AuthRepository } from "../repositories/Auth";
import bcrypt from "bcrypt";
import { IReg } from "../interfaces/User";
import { TokenService } from "./Token";
import { TokenRepository } from "../repositories/Token";

const authRepository = new AuthRepository();
const tokenService = new TokenService();
const tokenRepository = new TokenRepository();

export class AuthService {
  // User registration service
  async registration({ email, password, loggedWith, name, avatar }: IReg) {
    try {
      // Verifying a user with this name
      const candidate = await authRepository.getUser(email);
      if (candidate !== null) {
        return null;
      }

      // Hash the password
      const hashPassword = await bcrypt.hash(password, 16);

      // Creating a user
      const user = await authRepository.createUser({
        email: email,
        password: hashPassword,
        loggedWith: loggedWith,
        name: name,
        avatar: avatar,
      });

      // Generating refresh token
      const refreshToken = await tokenService.generateRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role?.name || "USER",
        loggedWith: user.loggedWith,
      });

      // Generating access token
      const accessToken = await tokenService.generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role?.name || "USER",
        loggedWith: user.loggedWith,
      });

      // Saving refresh session in db
      await tokenRepository.createRefreshSession(user.id, refreshToken);

      return {
        refreshToken: refreshToken,
        accessToken: accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  // User login service
  async login(email: string, password: string, sub: string) {
    try {
      // Verifying a user with this name
      const user = await authRepository.getUser(email);

      if (user === null) {
        return null;
      }

      if (user.loggedWith === "credentials" && password) {
        // Verifying the password
        const validPassword = await bcrypt.compare(
          password,
          user.hashPassword!
        );

        if (!validPassword) {
          return null;
        }
      } else {
        if (!sub) {
          return "SUB";
        }
        // Verifying the password
        const validPassword = await bcrypt.compare(sub, user.hashPassword!);

        if (!validPassword) {
          return "SUB";
        }
      }

      // Generating refresh token
      const refreshToken = await tokenService.generateRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role?.name || "USER",
        loggedWith: user.loggedWith,
      });

      await tokenRepository.updateRefreshSession(user.id, refreshToken);

      // Generating access token
      const accessToken = await tokenService.generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role?.name || "USER",
        loggedWith: user.loggedWith,
      });

      return {
        refreshToken: refreshToken,
        accessToken: accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  // User logout service
  async logout(refreshToken: string) {
    try {
      const token = await tokenRepository.deleteRefreshSession(refreshToken);

      return token;
    } catch (error) {
      throw error;
    }
  }

  // Refresh access service
  async refreshAccessToken(refreshToken: string) {
    try {
      // Validating refresh token
      if (!refreshToken) {
        return null;
      }

      const user = await tokenService.validateRefreshToken(refreshToken);
      if (user === null) {
        return null;
      } else {
        // Generating access token
        const accessToken = await tokenService.generateAccessToken({
          id: user.id,
          email: user.email,
          loggedWith: user.loggedWith,
          role: user.role,
        });

        return accessToken;
      }
    } catch (error) {
      throw error;
    }
  }
  async getAllUsers() {
    try {
      const users = await authRepository.getAllUsers();

      return users;
    } catch (error) {
      throw error;
    }
  }
}
