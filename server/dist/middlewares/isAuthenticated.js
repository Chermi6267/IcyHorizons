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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
const Token_1 = require("../services/Token");
const tokenService = new Token_1.TokenService();
// Middleware to check if the user is logged in
function isAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).json({ message: "Токен аутентификации недоступен" });
        }
        try {
            // Check access token
            const userData = yield tokenService.validateAccessToken(token.split(" ")[1]);
            if (userData === null) {
                return res.status(401).json({ message: "Неверный токен аутентификации" });
            }
            req.user = userData;
            // The following function is carried out
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Неверный токен аутентификации" });
        }
    });
}
