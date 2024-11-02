import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { AuthService } from "../services/Auth";

const authService = new AuthService();

export class AuthController {
  // Explicit binding of class methods to instances
  constructor() {
    this.registration = this.registration.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.refreshAccessToken = this.refreshAccessToken.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  // User registration controller
  async registration(req: Request, res: Response) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const { email, password, loggedWith, name, avatar, sub } = req.body;

      if (loggedWith === "credentials" && (password === "" || !password)) {
        return res.status(422).json({ message: "Пароль не может быть пустым" });
      }

      const user = await authService.registration({
        email: email,
        password: password === "" || !password ? sub : password,
        loggedWith: loggedWith,
        name: name,
        avatar: avatar,
      });

      if (user === null) {
        if (loggedWith === "credentials") {
          // If user logged with email and password
          return res
            .status(400)
            .json({ message: "Пользователь уже зарегистрирован" });
        } else {
          console.log("LOGIN");
          // If user logged with other service(google for example)
          return await this.login(req, res);
        }
      } else {
        // Saving refresh session in cookie
        res.cookie(
          "refreshToken",
          user.refreshToken,
          JSON.parse(process.env.REFRESH_TOKEN_COOKIE_OPTIONS!)
        );

        return res.json({ accessToken: user.accessToken });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при регистрации пользователя" });
    }
  }

  // User login controller
  async login(req: Request, res: Response) {
    try {
      // Validation of the Login Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const { email, password, sub } = req.body;
      const user = await authService.login(email, password, sub);

      if (user === null) {
        return res
          .status(400)
          .json({ message: "Неправильная пара логин/пароль" });
      } else if (user === "SUB") {
        return res.status(400).json({
          message:
            "При регистрации с помощью стороннего провайдера произошла ошибка",
        });
      } else {
        // Saving refresh session in cookie
        res.cookie(
          "refreshToken",
          user.refreshToken,
          JSON.parse(process.env.REFRESH_TOKEN_COOKIE_OPTIONS!)
        );

        return res.json({ accessToken: user.accessToken });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при входе пользователя" });
    }
  }

  // User logout controller
  async logout(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies["refreshToken"];
      if (!refreshToken) {
        return res.status(400).json({ message: "Пользователь не в системе" });
      }

      const token = await authService.logout(refreshToken);

      res.clearCookie("refreshToken");

      return res.json({ message: "Пользователь успешно вышел из системы" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при выходе пользователя из системы" });
    }
  }

  // Refresh access controller
  async refreshAccessToken(req: Request, res: Response) {
    try {
      const token = req.cookies["refreshToken"];
      const accessToken = await authService.refreshAccessToken(token);

      if (accessToken === null) {
        return res.status(400).json({ message: "Не корректный refresh токен" });
      }

      return res.json({ accessToken: accessToken });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при обновлении access токена" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await authService.getAllUsers();

      return res.json(users);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении пользователей" });
    }
  }
}
