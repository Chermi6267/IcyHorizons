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
exports.CommentService = void 0;
const Comment_1 = require("../repositories/Comment");
const commentRepository = new Comment_1.CommentRepository();
class CommentService {
    getAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield commentRepository.getAllComments();
                return comments;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getByLandmarkId(landmarkId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield commentRepository.getByLandmarkId(landmarkId);
                return comments;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createComment(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield commentRepository.createComment(options);
                return comment;
            }
            catch (error) {
                throw error;
            }
        });
    }
    modifyComment(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield commentRepository.modifyComment(options);
                return comment;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteComment(userId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield commentRepository.deleteComment(userId, commentId);
                return comment;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CommentService = CommentService;
