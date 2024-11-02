import { Request, Response } from "express";
import { CommentService } from "../services/Comment";
import { validationResult } from "express-validator";
import { IUserRequest } from "../interfaces/User";

const commentService = new CommentService();

export class CommentController {
  async getAllComments(req: Request, res: Response) {
    try {
      const comments = await commentService.getAllComments();

      return res.json(comments);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении всех отзывов" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const landmarkId = parseInt(req.params.landmarkId, 10);
      const comments = await commentService.getByLandmarkId(landmarkId);

      return res.json(comments);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении всех отзывов" });
    }
  }

  async createComment(req: IUserRequest, res: Response) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const landmarkId = parseInt(req.body.landmarkId, 10);
      const stars = parseFloat(req.body.stars);
      const text = req.body.text;
      const userId = req.user?.id;

      if (userId === undefined) {
        return res.status(403).json({ message: "Не авторизован" });
      }

      const comment = await commentService.createComment({
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
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении всех отзывов" });
    }
  }

  async modifyComment(req: IUserRequest, res: Response) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const landmarkId = parseInt(req.body.landmarkId, 10);
      const stars = parseFloat(req.body.stars);
      const text = req.body.text;
      const commentId = parseInt(req.body.commentId, 10);
      const userId = req.user?.id;

      if (userId === undefined) {
        return res.status(403).json({ message: "Не авторизован" });
      }

      const comment = await commentService.modifyComment({
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
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении всех отзывов" });
    }
  }

  async deleteComment(req: IUserRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (userId === undefined) {
        return res.status(403).json({ message: "Не авторизован" });
      }

      const commentId = parseInt(req.body.commentId, 10);

      const comment = await commentService.deleteComment(userId, commentId);

      if (comment == "COMMENT") {
        return res.status(404).json({ message: "Отзыв не найден" });
      }

      return res.json(comment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при удалении отзыва" });
    }
  }
}
