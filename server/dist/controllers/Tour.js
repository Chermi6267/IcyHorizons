"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourController = void 0;
const Tour_1 = require("../services/Tour");
const express_validator_1 = require("express-validator");
const tourService = new Tour_1.TourService();
class TourController {
    getAllTours(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tours = yield tourService.getAllTours();
                return res.json(tours);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Ошибка при получении туров" });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                if (Number.isNaN(id)) {
                    return res.status(422).json({ message: "Неправильный id тура" });
                }
                const tour = yield tourService.getById(id);
                if (tour === null) {
                    return res.status(404).json({ message: "Тур не найден" });
                }
                return res.json(tour);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Ошибка при получении туров" });
            }
        });
    }
    createTour(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validation of the Registration Form
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (validationErrors["errors"].length !== 0) {
                    return res
                        .status(422)
                        .json({ message: validationErrors["errors"][0]["msg"] });
                }
                const { title, description, landmarks } = req.body;
                const newTour = yield tourService.createTour({
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
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Ошибка при создании тура" });
            }
        });
    }
    deleteTour(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                if (Number.isNaN(id)) {
                    return res.status(422).json({ message: "Неправильный id тура" });
                }
                const tour = yield tourService.deleteTour(id);
                if (tour === null) {
                    return res.status(404).json({ message: "Тур не найден" });
                }
                return res.json(tour);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Ошибка при удалении тура" });
            }
        });
    }
    appendLandmark(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { tourId, landmarkId } = req.body;
                tourId = parseInt(tourId, 10);
                landmarkId = parseInt(landmarkId, 10);
                if (Number.isNaN(tourId) || Number.isNaN(landmarkId)) {
                    return res
                        .status(422)
                        .json({ message: "Неправильный id тура или достопримечательности" });
                }
                const tour = yield tourService.appendOrRemoveLandmark(tourId, landmarkId, "APPEND");
                switch (tour) {
                    case "TOUR":
                        return res.status(404).json({ message: "Тур не найден" });
                    case "LANDMARK":
                        return res
                            .status(404)
                            .json({ message: "Достопримечательность не найдена" });
                }
                return res.json(tour);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Ошибка при удалении тура" });
            }
        });
    }
    removeLandmark(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { tourId, landmarkId } = req.body;
                tourId = parseInt(tourId, 10);
                landmarkId = parseInt(landmarkId, 10);
                if (Number.isNaN(tourId) || Number.isNaN(landmarkId)) {
                    return res
                        .status(422)
                        .json({ message: "Неправильный id тура или достопримечательности" });
                }
                const tour = yield tourService.appendOrRemoveLandmark(tourId, landmarkId, "REMOVE");
                switch (tour) {
                    case "TOUR":
                        return res.status(404).json({ message: "Тур не найден" });
                    case "LANDMARK":
                        return res
                            .status(404)
                            .json({ message: "Достопримечательность не найдена" });
                }
                return res.json(tour);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Ошибка при удалении тура" });
            }
        });
    }
}
exports.TourController = TourController;
