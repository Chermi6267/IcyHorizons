import { Request, Response } from "express";
import { TourService } from "../services/Tour";
import { validationResult } from "express-validator";
import { ITour } from "../interfaces/Tour";

const tourService = new TourService();

export class TourController {
  async getAllTours(req: Request, res: Response) {
    try {
      const tours = await tourService.getAllTours();

      return res.json(tours);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при получении туров" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (Number.isNaN(id)) {
        return res.status(422).json({ message: "Неправильный id тура" });
      }

      const tour = await tourService.getById(id);

      if (tour === null) {
        return res.status(404).json({ message: "Тур не найден" });
      }

      return res.json(tour);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при получении туров" });
    }
  }

  async createTour(req: Request, res: Response) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const { title, description, landmarks } = req.body as ITour;

      const newTour = await tourService.createTour({
        title,
        description,
        landmarks,
      });

      switch (newTour) {
        case "TITLE":
          return res
            .status(400)
            .json({ message: "Тур с таким именем уже существует" });

        case "LANDMARKS":
          return res
            .status(400)
            .json({ message: "Проверьте список достопримечательностей" });
      }

      return res.json(newTour);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при создании тура" });
    }
  }

  async deleteTour(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (Number.isNaN(id)) {
        return res.status(422).json({ message: "Неправильный id тура" });
      }

      const tour = await tourService.deleteTour(id);

      if (tour === null) {
        return res.status(404).json({ message: "Тур не найден" });
      }

      return res.json(tour);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при удалении тура" });
    }
  }

  async appendLandmark(req: Request, res: Response) {
    try {
      let { tourId, landmarkId } = req.body;
      tourId = parseInt(tourId, 10);
      landmarkId = parseInt(landmarkId, 10);

      if (Number.isNaN(tourId) || Number.isNaN(landmarkId)) {
        return res
          .status(422)
          .json({ message: "Неправильный id тура или достопримечательности" });
      }

      const tour = await tourService.appendOrRemoveLandmark(
        tourId,
        landmarkId,
        "APPEND"
      );

      switch (tour) {
        case "TOUR":
          return res.status(404).json({ message: "Тур не найден" });

        case "LANDMARK":
          return res
            .status(404)
            .json({ message: "Достопримечательность не найдена" });
      }

      return res.json(tour);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при удалении тура" });
    }
  }

  async removeLandmark(req: Request, res: Response) {
    try {
      let { tourId, landmarkId } = req.body;
      tourId = parseInt(tourId, 10);
      landmarkId = parseInt(landmarkId, 10);

      if (Number.isNaN(tourId) || Number.isNaN(landmarkId)) {
        return res
          .status(422)
          .json({ message: "Неправильный id тура или достопримечательности" });
      }

      const tour = await tourService.appendOrRemoveLandmark(
        tourId,
        landmarkId,
        "REMOVE"
      );

      switch (tour) {
        case "TOUR":
          return res.status(404).json({ message: "Тур не найден" });

        case "LANDMARK":
          return res
            .status(404)
            .json({ message: "Достопримечательность не найдена" });
      }

      return res.json(tour);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при удалении тура" });
    }
  }
}
