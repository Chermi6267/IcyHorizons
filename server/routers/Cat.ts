import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";
import { check } from "express-validator";
import { CatController } from "../controllers/Cat";

const catController = new CatController();

export const catRouter = Router();

catRouter.get("/all", catController.getAllCats);

catRouter.post(
  "/create",
  isAuthenticated,
  isAdmin,
  [check("name", "Неправильный формат имени категории").notEmpty()],
  catController.createCat
);

catRouter.put(
  "/modify",
  isAuthenticated,
  isAdmin,
  [
    check("name", "Неправильный формат имени категории").notEmpty(),
    check("catId", "Неправильный формат id категории").notEmpty().isInt(),
  ],
  catController.modifyCat
);

catRouter.delete(
  "/delete/:catId",
  isAuthenticated,
  isAdmin,
  [check("catId", "Неправильный формат id категории").notEmpty().isInt()],
  catController.deleteCat
);
