import { Request, Response } from "express";
import { LandmarkService } from "../services/Landmark";
import { ILandmark, IUpdateLandmark } from "../interfaces/Landmark";
import { validationResult } from "express-validator";

const landmarkService = new LandmarkService();

export class LandmarkController {
  async getAdminCenter(req: Request, res: Response) {
    try {
      const { adminCenterId } = req.params;

      const result = await landmarkService.getAdminCenter(adminCenterId);

      res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Ошибка при получении данных о административном центре",
      });
    }
  }

  async getAllLandmarks(req: Request, res: Response) {
    try {
      const page = parseInt(req.params.page, 10) || 1;
      const limit = parseInt(req.params.limit, 10) || 10;

      const pageNum = Math.max(1, page);
      const limitNum = Math.max(1, limit);

      const { landmarks, totalCount } = await landmarkService.getAllLandmarks(
        pageNum,
        limitNum
      );

      res.json({
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        landmarks,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении всех достопримечательностей" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      let id = parseInt(req.params.id);

      const landmark = await landmarkService.getLandmarksById(id);

      if (landmark === null) {
        return res
          .status(404)
          .json({ message: "Достопримечательность не найдена" });
      }

      return res.json(landmark);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `Ошибка при получении достопримечательностей по Id (${req.params.adminCenterId})`,
      });
    }
  }

  async getByCategories(req: Request, res: Response) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const cats = req.query.cats as string;
      const { adminCenterId } = req.params;

      let categoryArray = [] as number[];
      if (cats) {
        categoryArray = cats.split(",").map((el: string) => {
          return parseInt(el, 10);
        });
      }
      const { adminCenter, landmarks } =
        await landmarkService.getLandmarksByCat(categoryArray, adminCenterId);

      return res.json({ adminCenter, landmarks });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `Ошибка при получении достопримечательностей по категориям (${req.params.categories})`,
      });
    }
  }

  async getByAdminCenterId(req: Request, res: Response) {
    try {
      const adminCenterId = req.params.adminCenterId;

      const { adminCenter, landmarks } =
        await landmarkService.getLandmarksByAdminCenterId(adminCenterId);

      return res.json({ adminCenter, landmarks });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `Ошибка при получении достопримечательностей по Id административного центра (${req.params.adminCenterId})`,
      });
    }
  }

  async deleteLandmark(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);

      const result = await landmarkService.deleteLandmark(id);
      if (result === null) {
        return res
          .status(404)
          .json({ message: "Проверьте id достопримечательности" });
      }

      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: `Ошибка при удалении достопримечательности с id (${req.params.id})`,
      });
    }
  }

  async createLandmark(req: Request, res: Response) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      let {
        name,
        latitude,
        longitude,
        description,
        adminCenterId,
        catId,
        link,
      } = req.body as ILandmark;

      const files = req.files as Express.Multer.File[];
      if (files.length === 0) {
        return res.status(400).json({ message: "Нет изображений" });
      }

      latitude = parseFloat(String(latitude));
      longitude = parseFloat(String(longitude));
      catId = JSON.parse(catId.toString()).map((element: any) => {
        return parseInt(element, 10);
      });
      let rating = 0.0;

      const newLandmark = await landmarkService.createLandmark(
        {
          name,
          latitude,
          longitude,
          description,
          adminCenterId,
          catId,
          link,
          rating,
        },
        files
      );

      if (newLandmark === null) {
        return res.status(400).json({
          message:
            "Проверьте название и ссылку на достопримечательность. Убедитесь, что они уникальны и не повторяются",
        });
      }

      return res.json({ newLandmark });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ошибка при создании достопримечательности" });
    }
  }

  async updateLandmark(req: Request, res: Response) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      let {
        name,
        latitude,
        longitude,
        description,
        adminCenterId,
        catId,
        link,
        rating,
      } = req.body as IUpdateLandmark;

      const id = parseInt(req.params.id, 10);
      if (catId) {
        catId = JSON.parse(catId.toString()).map((element: any) => {
          return parseInt(element, 10);
        });
      }

      latitude = latitude ? parseFloat(latitude?.toString()) : undefined;
      longitude = longitude ? parseFloat(longitude?.toString()) : undefined;

      const updateLandmark = await landmarkService.updateLandmark({
        id,
        name,
        latitude,
        longitude,
        description,
        adminCenterId,
        catId,
        link,
        rating,
      });

      return res.json(updateLandmark);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: `Ошибка при обновлении достопримечательности по id ${req.params.id}`,
      });
    }
  }

  async getSmallImage(req: Request, res: Response) {
    try {
      const image = await landmarkService.getImage(
        `landmark/small/${req.params.imageName}`
      );

      res.setHeader("Content-Type", "image/jpeg");
      res.send(image);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении изображения (small)" });
    }
  }

  async getDefaultImage(req: Request, res: Response) {
    try {
      const image = await landmarkService.getImage(
        `landmark/default/${req.params.imageName}`
      );

      res.setHeader("Content-Type", "image/jpeg");
      res.send(image);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении изображения (default)" });
    }
  }

  async deleteLandmarkImage(req: Request, res: Response) {
    try {
      const landmarkId = parseInt(req.params.id, 10);
      const imageName = req.params.imageName;

      const result = await landmarkService.deleteLandmarkImage(
        landmarkId,
        imageName
      );

      if (result === null) {
        return res.status(400).json({
          message: "Проверти id достопримечательности и имя изображение",
        });
      }

      return res.json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при удалении изображения" });
    }
  }

  async addLandmarkImage(req: Request, res: Response) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const landmarkId = parseInt(req.body.id, 10);

      const files = req.files as Express.Multer.File[];
      if (files.length === 0) {
        return res.status(400).json({ message: "Нет изображения" });
      }

      const result = await landmarkService.addLandmarkImage(
        landmarkId,
        files[0]
      );

      if (result === null) {
        return res.status(400).json({
          message: "Проверти id достопримечательности",
        });
      }

      return res.json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при добавления изображения" });
    }
  }
}
