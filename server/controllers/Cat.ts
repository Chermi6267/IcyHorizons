import { Request, Response } from "express";
import { CatService } from "../services/Cat";
import { validationResult } from "express-validator";

const catService = new CatService();

export class CatController {
  async getAllCats(req: Request, res: Response) {
    try {
      const cats = await catService.getAllCats();

      return res.json(cats);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении всех категорий" });
    }
  }

  async createCat(req: Request, res: Response) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const catName = req.body.name;
      const cat = await catService.createCat(catName);

      if (cat === null) {
        return res
          .status(400)
          .json({ message: "Категория с этим именем уже существует" });
      }

      return res.json(cat);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении всех категорий" });
    }
  }

  async modifyCat(req: Request, res: Response) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const catName = req.body.name;
      const catId = parseInt(req.body.catId, 10);
      const cat = await catService.modifyCat(catId, catName);

      if (cat === null) {
        return res
          .status(404)
          .json({ message: `Категория с id = ${catId} не найдена` });
      }

      return res.json(cat);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении всех категорий" });
    }
  }

  async deleteCat(req: Request, res: Response) {
    try {
      // Validation of the Registration Form
      const validationErrors = validationResult(req);
      if (validationErrors["errors"].length !== 0) {
        return res
          .status(422)
          .json({ message: validationErrors["errors"][0]["msg"] });
      }

      const catId = parseInt(req.params.catId, 10);
      const cat = await catService.deleteCat(catId);

      if (cat === null) {
        return res
          .status(404)
          .json({ message: `Категория с id = ${catId} не найдена` });
      }

      return res.json(cat);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ошибка при получении всех категорий" });
    }
  }
}
