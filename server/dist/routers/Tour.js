"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourRouter = void 0;
const express_1 = require("express");
const Tour_1 = require("../controllers/Tour");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAdmin_1 = require("../middlewares/isAdmin");
const express_validator_1 = require("express-validator");
const tourController = new Tour_1.TourController();
exports.tourRouter = (0, express_1.Router)();
exports.tourRouter.get("/all", tourController.getAllTours);
exports.tourRouter.get("/:id", tourController.getById);
exports.tourRouter.post("/create", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, [
    (0, express_validator_1.check)("title", "Название тура не должно быть пустым").notEmpty(),
    (0, express_validator_1.check)("description", "Описание тура не должно быть пустым").notEmpty(),
    (0, express_validator_1.check)("landmarks", "Некорректный формат достопримечательностей. Необходим: [1,2,3,...]").custom((value) => {
        if (!Array.isArray(value)) {
            throw new Error("Некорректный формат достопримечательностей. Необходим: [1,2,3,...]");
        }
        value.forEach((item) => {
            if (!Number.isInteger(parseInt(item, 10))) {
                throw new Error("Некорректный формат достопримечательностей. Необходим: [1,2,3,...]");
            }
        });
        return true;
    }),
], tourController.createTour);
exports.tourRouter.delete("/delete/:id", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, tourController.deleteTour);
exports.tourRouter.post("/append", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, tourController.appendLandmark);
exports.tourRouter.post("/remove", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, tourController.removeLandmark);
