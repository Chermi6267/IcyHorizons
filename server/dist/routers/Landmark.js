"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.landmarkRouter = void 0;
const express_1 = require("express");
const Landmark_1 = require("../controllers/Landmark");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAdmin_1 = require("../middlewares/isAdmin");
const multer_1 = require("../middlewares/multer");
const express_validator_1 = require("express-validator");
exports.landmarkRouter = (0, express_1.Router)();
const landmarkController = new Landmark_1.LandmarkController();
exports.landmarkRouter.get("/all/:page/:limit", landmarkController.getAllLandmarks);
exports.landmarkRouter.get("/center/:adminCenterId", landmarkController.getByAdminCenterId);
exports.landmarkRouter.get("/id/:id", landmarkController.getById);
exports.landmarkRouter.get("/cat", [
    (0, express_validator_1.check)("cats", "Неправильный формат категорий. Необходимый формат: ?cats=1,2,3,...").custom((value) => {
        try {
            const test = value.split(",").map((el) => {
                return parseInt(el, 10);
            });
            return true;
        }
        catch (error) {
            throw new Error("Неправильный формат категорий. Необходимый формат: ?cats=1,2,3,...");
        }
    }),
], landmarkController.getByCategories);
exports.landmarkRouter.get("/image/small/:imageName", landmarkController.getSmallImage);
exports.landmarkRouter.get("/image/default/:imageName", landmarkController.getDefaultImage);
exports.landmarkRouter.post("/add", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, multer_1.multerMiddleware, [
    (0, express_validator_1.check)("name", "Достопримечательность должна иметь имя").notEmpty(),
    (0, express_validator_1.check)("latitude", "Неправильная широта. Необходимый формат: 123.123456").custom((value) => {
        if (isNaN(parseFloat(value))) {
            throw new Error("Неправильная широта. Необходимый формат: 123.123456");
        }
        return true;
    }),
    (0, express_validator_1.check)("longitude", "Неправильная долгота. Необходимый формат: 123.123456").custom((value) => {
        if (isNaN(parseFloat(value))) {
            throw new Error("Неправильная долгота. Необходимый формат: 123.123456");
        }
        return true;
    }),
    (0, express_validator_1.check)("description", "Достопримечательность должна иметь описание").notEmpty(),
    (0, express_validator_1.check)("adminCenterId", "Достопримечательность должна иметь административный цент").notEmpty(),
    (0, express_validator_1.check)("catId", "Неправильный формат catId. Необходимый формат: [1,2,3...]").custom((value) => {
        try {
            JSON.parse(value.toString()).map((element) => {
                return parseInt(element);
            });
        }
        catch (error) {
            throw new Error("Неправильный формат catId. Необходимый формат: [1,2,3...]");
        }
        return true;
    }),
    (0, express_validator_1.check)("link", "Достопримечательность должна иметь ссылку").notEmpty(),
    (0, express_validator_1.check)("link", "Неправильная ссылка достопримечательности").isURL(),
], landmarkController.createLandmark);
exports.landmarkRouter.put("/modify/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, multer_1.multerMiddleware, [
    (0, express_validator_1.check)("catId", "Неправильный формат catId. Необходимый формат: [1,2,3...]").custom((value) => {
        try {
            if (value) {
                JSON.parse(value.toString()).map((element) => {
                    return parseInt(element);
                });
            }
        }
        catch (error) {
            throw new Error("Неправильный формат catId. Необходимый формат: [1,2,3...]");
        }
        return true;
    }),
    (0, express_validator_1.check)("latitude", "Неправильная широта. Необходимый формат: 123.123456").custom((value) => {
        if (value) {
            if (isNaN(parseFloat(value))) {
                throw new Error("Неправильная широта. Необходимый формат: 123.123456");
            }
        }
        return true;
    }),
    (0, express_validator_1.check)("longitude", "Неправильная долгота. Необходимый формат: 123.123456").custom((value) => {
        if (value) {
            if (isNaN(parseFloat(value))) {
                throw new Error("Неправильная долгота. Необходимый формат: 123.123456");
            }
        }
        return true;
    }),
], landmarkController.updateLandmark);
exports.landmarkRouter.delete("/image/:id/:imageName", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, landmarkController.deleteLandmarkImage);
exports.landmarkRouter.post("/image/add", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, multer_1.multerMiddleware, [(0, express_validator_1.check)("id", "Не корректный id достопримечательности").notEmpty().isInt()], landmarkController.addLandmarkImage);
exports.landmarkRouter.delete("/delete/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, landmarkController.deleteLandmark);
