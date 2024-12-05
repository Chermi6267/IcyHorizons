import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserService } from "../services/User";
import { IUserRequest } from "../interfaces/User";

const userService = new UserService();

export class UserController {
  async changeName(req: IUserRequest, res: Response) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }
      const userId = req.user?.id;
      if (userId === undefined) {
        return res
          .status(401)
          .json({ message: "Не удалось получить access токен" });
      }

      const newName = req.body.name;
      const result = await userService.changeName(userId, newName);

      if (result === "USER") {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      res.cookie(
        "refreshToken",
        result.refreshToken,
        JSON.parse(process.env.REFRESH_TOKEN_COOKIE_OPTIONS!)
      );

      return res.json({
        newName: result.newName,
        accessToken: result.accessToken,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при смене имени пользователя" });
    }
  }

  async changeAvatar(req: IUserRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const oldAvatar = req.user?.avatar || "";
      if (userId === undefined) {
        return res
          .status(401)
          .json({ message: "Не удалось получить access токен" });
      }

      const file = req.file as Express.Multer.File;

      const result = await userService.changeAvatar(userId, file, oldAvatar);

      if (result === "USER") {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      res.cookie(
        "refreshToken",
        result.refreshToken,
        JSON.parse(process.env.REFRESH_TOKEN_COOKIE_OPTIONS!)
      );

      return res.json({
        avatar: result.avatar,
        accessToken: result.accessToken,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при смене аватара пользователя" });
    }
  }

  async changeHeader(req: IUserRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const oldHeader = req.user?.header || "";
      if (userId === undefined) {
        return res
          .status(401)
          .json({ message: "Не удалось получить access токен" });
      }

      const file = req.file as Express.Multer.File;

      const result = await userService.changeHeader(userId, file, oldHeader);

      if (result === "USER") {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      res.cookie(
        "refreshToken",
        result.refreshToken,
        JSON.parse(process.env.REFRESH_TOKEN_COOKIE_OPTIONS!)
      );

      return res.json({
        header: result.header,
        accessToken: result.accessToken,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при смене шапки пользователя" });
    }
  }

  async getAvatar(req: Request, res: Response) {
    try {
      const image = await userService.getImage(
        `user/avatar/${req.params.imageName}`
      );

      res.setHeader("Content-Type", "image/jpeg");
      res.send(image);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при получении аватара" });
    }
  }

  async getHeader(req: Request, res: Response) {
    try {
      const image = await userService.getImage(
        `user/header/${req.params.imageName}`
      );

      res.setHeader("Content-Type", "image/jpeg");
      res.send(image);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при получении шапки" });
    }
  }
}
