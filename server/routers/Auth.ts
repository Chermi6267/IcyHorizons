import { Router } from "express";
export const authRouter = Router();
import { AuthController } from "../controllers/Auth";
import { check } from "express-validator";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";

const authController = new AuthController();

authRouter.post(
  "/registration",
  [
    check("email", "Адрес электронная почты не может быть пустым").notEmpty(),
    check("email", "Введите корректный адрес электронной почты").isEmail(),
    check("email", "Слишком длинный адрес электронной почты").isLength({
      max: 255,
    }),
    check("loggedWith", "Поле loggedWith не может быть пустым").notEmpty(),
  ],
  authController.registration
);

authRouter.post(
  "/login",
  [
    check("email", "Email пользователя не может быть пустым").notEmpty(),
    // Custom validation to check either password or sub is not empty
    check("password").custom((value, { req }) => {
      if (!value && !req.body.sub) {
        throw new Error("Пароль и Sub не могут быть одновременно пустыми");
      }
      return true;
    }),
    check("sub").custom((value, { req }) => {
      if (!value && !req.body.password) {
        throw new Error("Пароль и Sub не могут быть одновременно пустыми");
      }
      return true;
    }),
  ],
  authController.login
);

authRouter.get("/logout", isAuthenticated, authController.logout);

authRouter.post("/refreshAccessToken", authController.refreshAccessToken);

authRouter.get(
  "/user/all",
  isAuthenticated,
  isAdmin,
  authController.getAllUsers
);
