import { Router } from "express";
import { CommentController } from "../controllers/Comment";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { check } from "express-validator";

export const commentRouter = Router();
const commentController = new CommentController();

commentRouter.get("/all", commentController.getAllComments);

commentRouter.get(
  "/id/:landmarkId",
  [
    check("landmarkId", "Неправильный формат id достопримечательности")
      .notEmpty()
      .isInt(),
  ],
  commentController.getById
);

commentRouter.post(
  "/create",
  isAuthenticated,
  [
    check("landmarkId", "Неправильный формат id достопримечательности")
      .notEmpty()
      .custom((value) => {
        if (Number.isNaN(parseInt(value, 10))) {
          throw new Error("Неправильный формат id достопримечательности");
        }

        return true;
      }),

    check("text", "Неправильный формат текста").notEmpty(),

    check("stars", "Неправильный формат рейтинга")
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
  ],
  commentController.createComment
);

commentRouter.put(
  "/modify",
  isAuthenticated,
  [
    check("landmarkId", "Неправильный формат id достопримечательности")
      .notEmpty()
      .custom((value) => {
        if (Number.isNaN(parseInt(value, 10))) {
          throw new Error("Неправильный формат id достопримечательности");
        }

        return true;
      }),

    check("commentId", "Неправильный формат id отзыва")
      .notEmpty()
      .custom((value) => {
        if (Number.isNaN(parseInt(value, 10))) {
          throw new Error("Неправильный формат id отзыва");
        }

        return true;
      }),

    check("stars", "Неправильный формат рейтинга").custom((value) => {
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
  ],
  commentController.modifyComment
);

commentRouter.delete(
  "/delete",
  isAuthenticated,
  [
    check("commentId", "Неправильный формат id отзыва")
      .notEmpty()
      .custom((value) => {
        if (Number.isNaN(parseInt(value, 10))) {
          throw new Error("Неправильный формат id отзыва");
        }

        return true;
      }),
  ],
  commentController.deleteComment
);
