import { Router } from "express";
import { LandmarkController } from "../controllers/Landmark";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";
import { multerMiddleware } from "../middlewares/multer";
import { check } from "express-validator";

export const landmarkRouter = Router();
const landmarkController = new LandmarkController();

landmarkRouter.get("/all/:page/:limit", landmarkController.getAllLandmarks);

landmarkRouter.get(
  "/center/:adminCenterId",
  landmarkController.getByAdminCenterId
);

landmarkRouter.get("/id/:id", landmarkController.getById);

landmarkRouter.get(
  "/:adminCenterId/cat",
  [
    check(
      "cats",
      "Неправильный формат категорий. Необходимый формат: ?cats=1,2,3,..."
    ).custom((value) => {
      try {
        const test = value.split(",").map((el: string) => {
          return parseInt(el, 10);
        });

        return true;
      } catch (error) {
        throw new Error(
          "Неправильный формат категорий. Необходимый формат: ?cats=1,2,3,..."
        );
      }
    }),
  ],
  landmarkController.getByCategories
);

landmarkRouter.get("/image/small/:imageName", landmarkController.getSmallImage);

landmarkRouter.get(
  "/image/default/:imageName",
  landmarkController.getDefaultImage
);

landmarkRouter.post(
  "/add",
  isAuthenticated,
  isAdmin,
  multerMiddleware,
  [
    check("name", "Достопримечательность должна иметь имя").notEmpty(),

    check(
      "latitude",
      "Неправильная широта. Необходимый формат: 123.123456"
    ).custom((value) => {
      if (isNaN(parseFloat(value))) {
        throw new Error("Неправильная широта. Необходимый формат: 123.123456");
      }

      return true;
    }),

    check(
      "longitude",
      "Неправильная долгота. Необходимый формат: 123.123456"
    ).custom((value) => {
      if (isNaN(parseFloat(value))) {
        throw new Error("Неправильная долгота. Необходимый формат: 123.123456");
      }

      return true;
    }),

    check(
      "description",
      "Достопримечательность должна иметь описание"
    ).notEmpty(),

    check(
      "adminCenterId",
      "Достопримечательность должна иметь административный цент"
    ).notEmpty(),

    check(
      "catId",
      "Неправильный формат catId. Необходимый формат: [1,2,3...]"
    ).custom((value) => {
      try {
        JSON.parse(value.toString()).map((element: any) => {
          return parseInt(element);
        });
      } catch (error) {
        throw new Error(
          "Неправильный формат catId. Необходимый формат: [1,2,3...]"
        );
      }

      return true;
    }),

    check("link", "Достопримечательность должна иметь ссылку").notEmpty(),
    check("link", "Неправильная ссылка достопримечательности").isURL(),
  ],

  landmarkController.createLandmark
);

landmarkRouter.put(
  "/modify/:id",
  isAuthenticated,
  isAdmin,
  multerMiddleware,
  [
    check(
      "catId",
      "Неправильный формат catId. Необходимый формат: [1,2,3...]"
    ).custom((value) => {
      try {
        if (value) {
          JSON.parse(value.toString()).map((element: any) => {
            return parseInt(element);
          });
        }
      } catch (error) {
        throw new Error(
          "Неправильный формат catId. Необходимый формат: [1,2,3...]"
        );
      }

      return true;
    }),
    check(
      "latitude",
      "Неправильная широта. Необходимый формат: 123.123456"
    ).custom((value) => {
      if (value) {
        if (isNaN(parseFloat(value))) {
          throw new Error(
            "Неправильная широта. Необходимый формат: 123.123456"
          );
        }
      }

      return true;
    }),

    check(
      "longitude",
      "Неправильная долгота. Необходимый формат: 123.123456"
    ).custom((value) => {
      if (value) {
        if (isNaN(parseFloat(value))) {
          throw new Error(
            "Неправильная долгота. Необходимый формат: 123.123456"
          );
        }
      }

      return true;
    }),
  ],
  landmarkController.updateLandmark
);

landmarkRouter.delete(
  "/image/:id/:imageName",
  isAuthenticated,
  isAdmin,
  landmarkController.deleteLandmarkImage
);

landmarkRouter.post(
  "/image/add",
  isAuthenticated,
  isAdmin,
  multerMiddleware,
  [check("id", "Не корректный id достопримечательности").notEmpty().isInt()],
  landmarkController.addLandmarkImage
);

landmarkRouter.delete(
  "/delete/:id",
  isAuthenticated,
  isAdmin,
  landmarkController.deleteLandmark
);

landmarkRouter.get(
  "/center/info/:adminCenterId",
  landmarkController.getAdminCenter
);
