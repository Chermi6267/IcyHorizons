"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_validator_1 = require("express-validator");
const Auth_1 = require("../services/Auth");
const authService = new Auth_1.AuthService();
class AuthController {
    // Explicit binding of class methods to instances
    constructor() {
        this.registration = this.registration.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.refreshAccessToken = this.refreshAccessToken.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
    }
    // User registration controller
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validation of the Registration Form
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (validationErrors["errors"].length !== 0) {
                    return res
                        .status(422)
                        .json({ message: validationErrors["errors"][0]["msg"] });
                }
                const { email, password, loggedWith, name, avatar, sub } = req.body;
                if (loggedWith === "credentials" && (password === "" || !password)) {
                    return res.status(422).json({ message: "Пароль не может быть пустым" });
                }
                const user = yield authService.registration({
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
                    }
                    else {
                        console.log("LOGIN");
                        // If user logged with other service(google for example)
                        return yield this.login(req, res);
                    }
                }
                else {
                    // Saving refresh session in cookie
                    res.cookie("refreshToken", user.refreshToken, JSON.parse(process.env.REFRESH_TOKEN_COOKIE_OPTIONS));
                    return res.json({ accessToken: user.accessToken });
                }
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при регистрации пользователя" });
            }
        });
    }
    // User login controller
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validation of the Login Form
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (validationErrors["errors"].length !== 0) {
                    return res
                        .status(422)
                        .json({ message: validationErrors["errors"][0]["msg"] });
                }
                const { email, password, sub } = req.body;
                const user = yield authService.login(email, password, sub);
                if (user === null) {
                    return res
                        .status(400)
                        .json({ message: "Неправильная пара логин/пароль" });
                }
                else {
                    // Saving refresh session in cookie
                    res.cookie("refreshToken", user.refreshToken, JSON.parse(process.env.REFRESH_TOKEN_COOKIE_OPTIONS));
                    return res.json({ accessToken: user.accessToken });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Ошибка при входе пользователя" });
            }
        });
    }
    // User logout controller
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies["refreshToken"];
                if (!refreshToken) {
                    return res.status(400).json({ message: "Пользователь не в системе" });
                }
                const token = yield authService.logout(refreshToken);
                res.clearCookie("refreshToken");
                return res.json({ message: "Пользователь успешно вышел из системы" });
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при выходе пользователя из системы" });
            }
        });
    }
    // Refresh access controller
    refreshAccessToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies["refreshToken"];
                const accessToken = yield authService.refreshAccessToken(token);
                if (accessToken === null) {
                    return res.status(400).json({ message: "Не корректный refresh токен" });
                }
                return res.json({ accessToken: accessToken });
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при обновлении access токена" });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield authService.getAllUsers();
                return res.json(users);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при получении пользователей" });
            }
        });
    }
}
exports.AuthController = AuthController;
