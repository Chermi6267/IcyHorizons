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
exports.CommentController = void 0;
const Comment_1 = require("../services/Comment");
const express_validator_1 = require("express-validator");
const commentService = new Comment_1.CommentService();
class CommentController {
    getAllComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield commentService.getAllComments();
                return res.json(comments);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при получении всех отзывов" });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validation of the Registration Form
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (validationErrors["errors"].length !== 0) {
                    return res
                        .status(422)
                        .json({ message: validationErrors["errors"][0]["msg"] });
                }
                const landmarkId = parseInt(req.params.landmarkId, 10);
                const comments = yield commentService.getByLandmarkId(landmarkId);
                return res.json(comments);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при получении всех отзывов" });
            }
        });
    }
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Validation of the Registration Form
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (validationErrors["errors"].length !== 0) {
                    return res
                        .status(422)
                        .json({ message: validationErrors["errors"][0]["msg"] });
                }
                const landmarkId = parseInt(req.body.landmarkId, 10);
                const stars = parseFloat(req.body.stars);
                const text = req.body.text;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (userId === undefined) {
                    return res.status(403).json({ message: "Не авторизован" });
                }
                const comment = yield commentService.createComment({
                    text,
                    stars,
                    landmarkId,
                    userId,
                });
                if (comment === "LANDMARK") {
                    return res
                        .status(404)
                        .json({ message: "Достопримечательность не найдена" });
                }
                if (comment === "USER") {
                    return res.status(404).json({ message: "Пользователь не найден" });
                }
                return res.json(comment);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при получении всех отзывов" });
            }
        });
    }
    modifyComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Validation of the Registration Form
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (validationErrors["errors"].length !== 0) {
                    return res
                        .status(422)
                        .json({ message: validationErrors["errors"][0]["msg"] });
                }
                const landmarkId = parseInt(req.body.landmarkId, 10);
                const stars = parseFloat(req.body.stars);
                const text = req.body.text;
                const commentId = parseInt(req.body.commentId, 10);
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (userId === undefined) {
                    return res.status(403).json({ message: "Не авторизован" });
                }
                const comment = yield commentService.modifyComment({
                    text,
                    stars,
                    landmarkId,
                    userId,
                    commentId,
                });
                switch (comment) {
                    case "LANDMARK":
                        return res
                            .status(404)
                            .json({ message: "Достопримечательность не найдена" });
                    case "USER":
                        return res.status(404).json({ message: "Пользователь не найден" });
                    case "COMMENT":
                        return res.status(404).json({ message: "Отзыв не найден" });
                }
                return res.json(comment);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при получении всех отзывов" });
            }
        });
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (userId === undefined) {
                    return res.status(403).json({ message: "Не авторизован" });
                }
                const commentId = parseInt(req.body.commentId, 10);
                const comment = yield commentService.deleteComment(userId, commentId);
                if (comment == "COMMENT") {
                    return res.status(404).json({ message: "Отзыв не найден" });
                }
                return res.json(comment);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Ошибка при удалении отзыва" });
            }
        });
    }
}
exports.CommentController = CommentController;
