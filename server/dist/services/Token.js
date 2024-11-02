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
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
// Service for managing tokens
class TokenService {
    // Generating access token service
    generateAccessToken(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, email, role, loggedWith } = options;
            const payload = {
                id,
                email,
                role,
                loggedWith,
            };
            return jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
                expiresIn: "1h",
            });
        });
    }
    // Generating refresh token service
    generateRefreshToken(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, email, role, loggedWith } = options;
            const payload = {
                id,
                email,
                role,
                loggedWith,
            };
            return jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
                expiresIn: "7d",
            });
        });
    }
    // Validating refresh token service
    validateRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                return userData;
            }
            catch (e) {
                return null;
            }
        });
    }
    // Validating access token service
    validateAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_SECRET);
                return userData;
            }
            catch (e) {
                return null;
            }
        });
    }
}
exports.TokenService = TokenService;
