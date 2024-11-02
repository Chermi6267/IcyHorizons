"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const Comment_1 = require("../controllers/Comment");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const express_validator_1 = require("express-validator");
exports.commentRouter = (0, express_1.Router)();
const commentController = new Comment_1.CommentController();
exports.commentRouter.get("/all", commentController.getAllComments);
exports.commentRouter.get("/id/:landmarkId", [
    (0, express_validator_1.check)("landmarkId", "Неправильный формат id достопримечательности")
        .notEmpty()
        .isInt(),
], commentController.getById);
exports.commentRouter.post("/create", isAuthenticated_1.isAuthenticated, [
    (0, express_validator_1.check)("landmarkId", "Неправильный формат id достопримечательности")
        .notEmpty()
        .custom((value) => {
        if (Number.isNaN(parseInt(value, 10))) {
            throw new Error("Неправильный формат id достопримечательности");
        }
        return true;
    }),
    (0, express_validator_1.check)("text", "Неправильный формат текста").notEmpty(),
    (0, express_validator_1.check)("stars", "Неправильный формат рейтинга")
        .notEmpty()
        .custom((value) => {
        if (Number.isNaN(parseFloat(value))) {
            throw new Error("Неправильный формат рейтинга");
        }
        if (parseFloat(value) > 5.0) {
            throw new Error("Неправильный формат рейтинга");
        }
        return true;
    }),
], commentController.createComment);
exports.commentRouter.put("/modify", isAuthenticated_1.isAuthenticated, [
    (0, express_validator_1.check)("landmarkId", "Неправильный формат id достопримечательности")
        .notEmpty()
        .custom((value) => {
        if (Number.isNaN(parseInt(value, 10))) {
            throw new Error("Неправильный формат id достопримечательности");
        }
        return true;
    }),
    (0, express_validator_1.check)("commentId", "Неправильный формат id отзыва")
        .notEmpty()
        .custom((value) => {
        if (Number.isNaN(parseInt(value, 10))) {
            throw new Error("Неправильный формат id отзыва");
        }
        return true;
    }),
    (0, express_validator_1.check)("stars", "Неправильный формат рейтинга").custom((value) => {
        if (value) {
            if (Number.isNaN(parseFloat(value))) {
                throw new Error("Неправильный формат рейтинга");
            }
            if (parseFloat(value) > 5.0) {
                throw new Error("Неправильный формат рейтинга");
            }
        }
        return true;
    }),
], commentController.modifyComment);
exports.commentRouter.delete("/delete", isAuthenticated_1.isAuthenticated, [
    (0, express_validator_1.check)("commentId", "Неправильный формат id отзыва")
        .notEmpty()
        .custom((value) => {
        if (Number.isNaN(parseInt(value, 10))) {
            throw new Error("Неправильный формат id отзыва");
        }
        return true;
    }),
], commentController.deleteComment);
