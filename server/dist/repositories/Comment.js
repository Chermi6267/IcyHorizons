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
exports.CommentRepository = void 0;
const prismaClient_1 = __importDefault(require("./prismaClient"));
class CommentRepository {
    getAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield prismaClient_1.default.comment.findMany();
                return comments;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    getByLandmarkId(landmarkId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield prismaClient_1.default.comment.findMany({
                    where: {
                        landmarkId: landmarkId,
                    },
                });
                return comments;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    createComment(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const landmarkCandidate = yield prismaClient_1.default.landmark.findUnique({
                    where: { id: options.landmarkId },
                });
                if (landmarkCandidate === null) {
                    return "LANDMARK";
                }
                const userCandidate = yield prismaClient_1.default.user.findUnique({
                    where: { id: options.userId },
                });
                if (userCandidate === null) {
                    return "USER";
                }
                const time = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
                const comment = yield prismaClient_1.default.comment.create({
                    data: {
                        text: options.text,
                        stars: options.stars,
                        landmarkId: options.landmarkId,
                        userId: options.userId,
                        createdAt: time,
                        updatedAt: time,
                    },
                });
                return comment;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    modifyComment(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const landmarkCandidate = yield prismaClient_1.default.landmark.findUnique({
                    where: { id: options.landmarkId },
                });
                if (landmarkCandidate === null) {
                    return "LANDMARK";
                }
                const userCandidate = yield prismaClient_1.default.user.findUnique({
                    where: { id: options.userId },
                });
                if (userCandidate === null) {
                    return "USER";
                }
                const commentCandidate = yield prismaClient_1.default.comment.findFirst({
                    where: {
                        AND: [{ id: options.commentId }, { userId: options.userId }],
                    },
                });
                if (commentCandidate === null) {
                    return "COMMENT";
                }
                const comment = yield prismaClient_1.default.comment.update({
                    where: {
                        id: options.commentId,
                    },
                    data: {
                        text: options.text === undefined ? commentCandidate.text : options.text,
                        stars: options.stars === undefined
                            ? commentCandidate.stars
                            : options.stars,
                        updatedAt: new Date(new Date().getTime() + 9 * 60 * 60 * 1000),
                    },
                });
                return comment;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    deleteComment(userId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentCandidate = yield prismaClient_1.default.comment.findFirst({
                    where: {
                        AND: [{ id: commentId }, { userId: userId }],
                    },
                });
                if (commentCandidate === null) {
                    return "COMMENT";
                }
                const comment = yield prismaClient_1.default.comment.delete({
                    where: {
                        id: commentId,
                    },
                });
                return comment;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
}
exports.CommentRepository = CommentRepository;
