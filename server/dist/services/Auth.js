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
exports.AuthService = void 0;
const Auth_1 = require("../repositories/Auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Token_1 = require("./Token");
const Token_2 = require("../repositories/Token");
const authRepository = new Auth_1.AuthRepository();
const tokenService = new Token_1.TokenService();
const tokenRepository = new Token_2.TokenRepository();
class AuthService {
    // User registration service
    registration(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, loggedWith, name, avatar }) {
            var _b, _c;
            try {
                // Verifying a user with this name
                const candidate = yield authRepository.getUser(email);
                if (candidate !== null) {
                    return null;
                }
                // Hash the password
                const hashPassword = yield bcrypt_1.default.hash(password, 16);
                // Creating a user
                const user = yield authRepository.createUser({
                    email: email,
                    password: hashPassword,
                    loggedWith: loggedWith,
                    name: name,
                    avatar: avatar,
                });
                // Generating refresh token
                const refreshToken = yield tokenService.generateRefreshToken({
                    id: user.id,
                    email: user.email,
                    role: ((_b = user.role) === null || _b === void 0 ? void 0 : _b.name) || "USER",
                    loggedWith: user.loggedWith,
                });
                // Generating access token
                const accessToken = yield tokenService.generateAccessToken({
                    id: user.id,
                    email: user.email,
                    role: ((_c = user.role) === null || _c === void 0 ? void 0 : _c.name) || "USER",
                    loggedWith: user.loggedWith,
                });
                // Saving refresh session in db
                yield tokenRepository.createRefreshSession(user.id, refreshToken);
                return {
                    refreshToken: refreshToken,
                    accessToken: accessToken,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // User login service
    login(email, password, sub) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                // Verifying a user with this name
                const user = yield authRepository.getUser(email);
                if (user === null) {
                    return null;
                }
                if (user.loggedWith === "credentials") {
                    // Verifying the password
                    const validPassword = yield bcrypt_1.default.compare(password, user.hashPassword);
                    if (!validPassword) {
                        return null;
                    }
                }
                else {
                    if (!sub) {
                        return null;
                    }
                    // Verifying the password
                    const validPassword = yield bcrypt_1.default.compare(sub, user.hashPassword);
                    if (!validPassword) {
                        return null;
                    }
                }
                // Generating refresh token
                const refreshToken = yield tokenService.generateRefreshToken({
                    id: user.id,
                    email: user.email,
                    role: ((_a = user.role) === null || _a === void 0 ? void 0 : _a.name) || "USER",
                    loggedWith: user.loggedWith,
                });
                yield tokenRepository.updateRefreshSession(user.id, refreshToken);
                // Generating access token
                const accessToken = yield tokenService.generateAccessToken({
                    id: user.id,
                    email: user.email,
                    role: ((_b = user.role) === null || _b === void 0 ? void 0 : _b.name) || "USER",
                    loggedWith: user.loggedWith,
                });
                return {
                    refreshToken: refreshToken,
                    accessToken: accessToken,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // User logout service
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield tokenRepository.deleteRefreshSession(refreshToken);
                return token;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Refresh access service
    refreshAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validating refresh token
                if (!refreshToken) {
                    return null;
                }
                const user = yield tokenService.validateRefreshToken(refreshToken);
                if (user === null) {
                    return null;
                }
                else {
                    // Generating access token
                    const accessToken = yield tokenService.generateAccessToken({
                        id: user.id,
                        email: user.email,
                        loggedWith: user.loggedWith,
                        role: user.role,
                    });
                    return accessToken;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield authRepository.getAllUsers();
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.AuthService = AuthService;
