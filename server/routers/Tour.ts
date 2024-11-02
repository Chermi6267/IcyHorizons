import { Router } from "express";
import { TourController } from "../controllers/Tour";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";
import { check } from "express-validator";

const tourController = new TourController();
export const tourRouter = Router();

tourRouter.get("/all", tourController.getAllTours);

tourRouter.get("/:id", tourController.getById);

tourRouter.post(
  "/create",
  isAuthenticated,
  isAdmin,
  [
    check("title", "Название тура не должно быть пустым").notEmpty(),
    check("description", "Описание тура не должно быть пустым").notEmpty(),
    check(
      "landmarks",
      "Некорректный формат достопримечательностей. Необходим: [1,2,3,...]"
    ).custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error(
          "Некорректный формат достопримечательностей. Необходим: [1,2,3,...]"
        );
      }

      value.forEach((item: any) => {
        if (!Number.isInteger(parseInt(item, 10))) {
          throw new Error(
            "Некорректный формат достопримечательностей. Необходим: [1,2,3,...]"
          );
        }
      });

      return true;
    }),
  ],
  tourController.createTour
);

tourRouter.delete(
  "/delete/:id",
  isAuthenticated,
  isAdmin,
  tourController.deleteTour
);

tourRouter.post(
  "/append",
  isAuthenticated,
  isAdmin,
  tourController.appendLandmark
);

tourRouter.post(
  "/remove",
  isAuthenticated,
  isAdmin,
  tourController.removeLandmark
);
