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
exports.TokenRepository = void 0;
const prismaClient_1 = __importDefault(require("./prismaClient"));
// Repository for managing tokens
class TokenRepository {
    // Repository for creating refresh session
    createRefreshSession(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prismaClient_1.default.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        token: {
                            create: {
                                token: refreshToken,
                            },
                        },
                    },
                    select: {
                        token: true,
                    },
                });
                const token = user.token;
                return token;
            }
            catch (error) {
                throw new Error(`Ошибка при создании refresh токена: ${error}`);
            }
        });
    }
    // Repository for updating refresh session
    updateRefreshSession(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check for refresh session
                const token = yield prismaClient_1.default.token.findUnique({
                    where: {
                        userId: userId,
                    },
                });
                if (token === null) {
                    const newToken = yield prismaClient_1.default.token.create({
                        data: {
                            userId: userId,
                            token: refreshToken,
                        },
                    });
                    return newToken;
                }
                else {
                    const newToken = yield prismaClient_1.default.token.update({
                        where: {
                            userId: userId,
                        },
                        data: {
                            token: refreshToken,
                        },
                    });
                    return newToken;
                }
            }
            catch (error) {
                throw new Error(`Ошибка при обновлении refresh токена: ${error}`);
            }
        });
    }
    // Repository for deleting refresh session
    deleteRefreshSession(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield prismaClient_1.default.token.delete({
                    where: {
                        token: refreshToken,
                    },
                    select: {
                        token: true,
                    },
                });
                return token;
            }
            catch (error) {
                throw new Error(`Ошибка при удалении refresh токена: ${error}`);
            }
        });
    }
}
exports.TokenRepository = TokenRepository;
