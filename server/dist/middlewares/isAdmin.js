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
exports.isAdmin = isAdmin;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
// Middleware to check if the user is admin
function isAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check access token
            const userData = req.user;
            if ((userData === null || userData === void 0 ? void 0 : userData.role) !== "ADMIN") {
                return res.status(403).json({ message: "Нет прав доступа" });
            }
            // The following function is carried out
            next();
        }
        catch (error) {
            return res.status(403).json({ message: "Нет прав доступа" });
        }
    });
}
