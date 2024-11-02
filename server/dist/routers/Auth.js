"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
exports.authRouter = (0, express_1.Router)();
const Auth_1 = require("../controllers/Auth");
const express_validator_1 = require("express-validator");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAdmin_1 = require("../middlewares/isAdmin");
const authController = new Auth_1.AuthController();
exports.authRouter.post("/registration", [
    (0, express_validator_1.check)("email", "Адрес электронная почты не может быть пустым").notEmpty(),
    (0, express_validator_1.check)("email", "Введите корректный адрес электронной почты").isEmail(),
    (0, express_validator_1.check)("email", "Слишком длинный адрес электронной почты").isLength({
        max: 255,
    }),
    (0, express_validator_1.check)("loggedWith", "Поле loggedWith не может быть пустым").notEmpty(),
], authController.registration);
exports.authRouter.post("/login", [
    (0, express_validator_1.check)("email", "Email пользователя не может быть пустым").notEmpty(),
    // Custom validation to check either password or sub is not empty
    (0, express_validator_1.check)("password").custom((value, { req }) => {
        if (!value && !req.body.sub) {
            throw new Error("Пароль и Sub не могут быть одновременно пустыми");
        }
        return true;
    }),
    (0, express_validator_1.check)("sub").custom((value, { req }) => {
        if (!value && !req.body.password) {
            throw new Error("Пароль и Sub не могут быть одновременно пустыми");
        }
        return true;
    }),
], authController.login);
exports.authRouter.get("/logout", isAuthenticated_1.isAuthenticated, authController.logout);
exports.authRouter.post("/refreshAccessToken", authController.refreshAccessToken);
exports.authRouter.get("/user/all", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, authController.getAllUsers);
