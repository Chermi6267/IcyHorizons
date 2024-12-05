import path from "path";
import { FileRepository } from "../repositories/File";
import { TokenRepository } from "../repositories/Token";
import { UserRepository } from "../repositories/User";
import { TokenService } from "./Token";
import { v4 as uuid } from "uuid";

const userRepository = new UserRepository();
const tokenService = new TokenService();
const tokenRepository = new TokenRepository();
const fileRepository = new FileRepository();

export class UserService {
  async changeName(userId: number, newName: string) {
    try {
      const result = await userRepository.changeName(userId, newName);
      const userData = await userRepository.getUserData(userId);
      if (result === "USER" || userData === "USER") {
        return "USER";
      }

      const newAccessToken = await tokenService.generateAccessToken({
        id: userData.id,
        email: userData.email,
        role: userData.role.name,
        loggedWith: userData.loggedWith,
        avatar: result.avatar || "",
        header: result.header || "",
        name: result.name || "",
      });

      const newRefreshToken = await tokenService.generateRefreshToken({
        id: userData.id,
        email: userData.email,
        role: userData.role.name,
        loggedWith: userData.loggedWith,
        avatar: result.avatar || "",
        header: result.header || "",
        name: result.name || "",
      });

      await tokenRepository.updateRefreshSession(userId, newRefreshToken);

      return {
        newName: result.name,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async changeAvatar(
    userId: number,
    file: Express.Multer.File,
    oldAvatar: string
  ) {
    try {
      const fileName = `${uuid()}.${file.originalname.split(".").pop()}`;
      const result = await userRepository.changeAvatar(userId, fileName);
      const userData = await userRepository.getUserData(userId);
      if (result === "USER" || userData === "USER") {
        return "USER";
      }

      const newFilePath = path.join("public/user/avatar", fileName);
      const oldFilePath = path.join(
        "../public/user/avatar",
        oldAvatar.split("/").pop() || ""
      );
      await fileRepository
        .deleteImage(path.join(oldFilePath))
        .catch((error) => {});
      await fileRepository.saveFile(newFilePath, file.buffer);

      const newAccessToken = await tokenService.generateAccessToken({
        id: userData.id,
        email: userData.email,
        role: userData.role.name,
        loggedWith: userData.loggedWith,
        avatar: result.avatar || "",
        header: result.header || "",
        name: result.name || "",
      });

      const newRefreshToken = await tokenService.generateRefreshToken({
        id: userData.id,
        email: userData.email,
        role: userData.role.name,
        loggedWith: userData.loggedWith,
        avatar: result.avatar || "",
        header: result.header || "",
        name: result.name || "",
      });

      await tokenRepository.updateRefreshSession(userId, newRefreshToken);

      return {
        avatar: result.avatar,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async changeHeader(
    userId: number,
    file: Express.Multer.File,
    oldHeader: string
  ) {
    try {
      const fileName = `${uuid()}.${file.originalname.split(".").pop()}`;
      const result = await userRepository.changeHeader(userId, fileName);
      const userData = await userRepository.getUserData(userId);
      if (result === "USER" || userData === "USER") {
        return "USER";
      }

      const newFilePath = path.join("public/user/header", fileName);
      const oldFilePath = path.join(
        "../public/user/header",
        oldHeader.split("/").pop() || ""
      );
      await fileRepository
        .deleteImage(path.join(oldFilePath))
        .catch((error) => {});
      await fileRepository.saveFile(newFilePath, file.buffer);

      const newAccessToken = await tokenService.generateAccessToken({
        id: userData.id,
        email: userData.email,
        role: userData.role.name,
        loggedWith: userData.loggedWith,
        avatar: result.avatar || "",
        header: result.header || "",
        name: result.name || "",
      });

      const newRefreshToken = await tokenService.generateRefreshToken({
        id: userData.id,
        email: userData.email,
        role: userData.role.name,
        loggedWith: userData.loggedWith,
        avatar: result.avatar || "",
        header: result.header || "",
        name: result.name || "",
      });

      await tokenRepository.updateRefreshSession(userId, newRefreshToken);

      return {
        header: result.header,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async getImage(image: string) {
    try {
      const imgBuffer = await fileRepository.getIMG(image);

      return imgBuffer;
    } catch (error) {
      throw error;
    }
  }
}
