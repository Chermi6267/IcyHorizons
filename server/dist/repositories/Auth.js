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
exports.AuthRepository = void 0;
const prismaClient_1 = __importDefault(require("./prismaClient"));
class AuthRepository {
    // Get user
    getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prismaClient_1.default.user.findUnique({
                    where: {
                        email: email,
                    },
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        hashPassword: true,
                        loggedWith: true,
                        profile: true,
                        token: true,
                    },
                });
                return user;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    // Create user
    createUser(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, loggedWith, name, avatar } = options;
                const user = yield prismaClient_1.default.user.create({
                    data: {
                        email: email,
                        hashPassword: password,
                        role: {
                            connect: {
                                name: "USER",
                            },
                        },
                        loggedWith: loggedWith,
                        profile: {
                            create: {
                                name: name,
                                avatar: avatar,
                            },
                        },
                    },
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        loggedWith: true,
                        profile: true,
                    },
                });
                return user;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prismaClient_1.default.user.findMany({
                    select: {
                        id: true,
                        email: true,
                        loggedWith: true,
                        role: true,
                        profile: true,
                    },
                });
                return users;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
}
exports.AuthRepository = AuthRepository;
