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
exports.LandmarkController = void 0;
const Landmark_1 = require("../services/Landmark");
const express_validator_1 = require("express-validator");
const landmarkService = new Landmark_1.LandmarkService();
class LandmarkController {
    getAllLandmarks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.params.page, 10) || 1;
                const limit = parseInt(req.params.limit, 10) || 10;
                const pageNum = Math.max(1, page);
                const limitNum = Math.max(1, limit);
                const { landmarks, totalCount } = yield landmarkService.getAllLandmarks(pageNum, limitNum);
                res.json({
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / limit),
                    totalCount,
                    landmarks,
                });
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при получении всех достопримечательностей" });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params.id);
                const landmark = yield landmarkService.getLandmarksById(id);
                if (landmark === null) {
                    return res
                        .status(404)
                        .json({ message: "Достопримечательность не найдена" });
                }
                return res.json(landmark);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    message: `Ошибка при получении достопримечательностей по Id (${req.params.adminCenterId})`,
                });
            }
        });
    }
    getByCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validation of the Registration Form
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (validationErrors["errors"].length !== 0) {
                    return res
                        .status(422)
                        .json({ message: validationErrors["errors"][0]["msg"] });
                }
                const cats = req.query.cats;
                let categoryArray = [];
                if (cats) {
                    categoryArray = cats.split(",").map((el) => {
                        return parseInt(el, 10);
                    });
                }
                const landmark = yield landmarkService.getLandmarksByCat(categoryArray);
                return res.json(landmark);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    message: `Ошибка при получении достопримечательностей по категориям (${req.params.categories})`,
                });
            }
        });
    }
    getByAdminCenterId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCenterId = req.params.adminCenterId;
                const landmarks = yield landmarkService.getLandmarksByAdminCenterId(adminCenterId);
                return res.json(landmarks);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    message: `Ошибка при получении достопримечательностей по Id административного центра (${req.params.adminCenterId})`,
                });
            }
        });
    }
    deleteLandmark(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10);
                const result = yield landmarkService.deleteLandmark(id);
                if (result === null) {
                    return res
                        .status(404)
                        .json({ message: "Проверьте id достопримечательности" });
                }
                return res.json(result);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: `Ошибка при удалении достопримечательности с id (${req.params.id})`,
                });
            }
        });
    }
    createLandmark(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validation of the Registration Form
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (validationErrors["errors"].length !== 0) {
                    return res
                        .status(422)
                        .json({ message: validationErrors["errors"][0]["msg"] });
                }
                let { name, latitude, longitude, description, adminCenterId, catId, link, } = req.body;
                const files = req.files;
                if (files.length === 0) {
                    return res.status(400).json({ message: "Нет изображений" });
                }
                latitude = parseFloat(String(latitude));
                longitude = parseFloat(String(longitude));
                catId = JSON.parse(catId.toString()).map((element) => {
                    return parseInt(element, 10);
                });
                let rating = 0.0;
                const newLandmark = yield landmarkService.createLandmark({
                    name,
                    latitude,
                    longitude,
                    description,
                    adminCenterId,
                    catId,
                    link,
                    rating,
                }, files);
                if (newLandmark === null) {
                    return res.status(400).json({
                        message: "Проверьте название и ссылку на достопримечательность. Убедитесь, что они уникальны и не повторяются",
                    });
                }
                return res.json({ newLandmark });
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ message: "Ошибка при создании достопримечательности" });
            }
        });
    }
    updateLandmark(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(req);
                // Validation of the Registration Form
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (validationErrors["errors"].length !== 0) {
                    return res
                        .status(422)
                        .json({ message: validationErrors["errors"][0]["msg"] });
                }
                let { name, latitude, longitude, description, adminCenterId, catId, link, rating, } = req.body;
                const id = parseInt(req.params.id, 10);
                if (catId) {
                    catId = JSON.parse(catId.toString()).map((element) => {
                        return parseInt(element, 10);
                    });
                }
                latitude = latitude ? parseFloat(latitude === null || latitude === void 0 ? void 0 : latitude.toString()) : undefined;
                longitude = longitude ? parseFloat(longitude === null || longitude === void 0 ? void 0 : longitude.toString()) : undefined;
                const updateLandmark = yield landmarkService.updateLandmark({
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
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: `Ошибка при обновлении достопримечательности по id ${req.params.id}`,
                });
            }
        });
    }
    getSmallImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield landmarkService.getImage(`landmark/small/${req.params.imageName}`);
                res.setHeader("Content-Type", "image/jpeg");
                res.send(image);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при получении изображения (small)" });
            }
        });
    }
    getDefaultImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield landmarkService.getImage(`landmark/default/${req.params.imageName}`);
                res.setHeader("Content-Type", "image/jpeg");
                res.send(image);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при получении изображения (default)" });
            }
        });
    }
    deleteLandmarkImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const landmarkId = parseInt(req.params.id, 10);
                const imageName = req.params.imageName;
                const result = yield landmarkService.deleteLandmarkImage(landmarkId, imageName);
                if (result === null) {
                    return res.status(400).json({
                        message: "Проверти id достопримечательности и имя изображение",
                    });
                }
                return res.json(result);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при удалении изображения" });
            }
        });
    }
    addLandmarkImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validation of the Registration Form
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (validationErrors["errors"].length !== 0) {
                    return res
                        .status(422)
                        .json({ message: validationErrors["errors"][0]["msg"] });
                }
                const landmarkId = parseInt(req.body.id, 10);
                const files = req.files;
                if (files.length === 0) {
                    return res.status(400).json({ message: "Нет изображения" });
                }
                const result = yield landmarkService.addLandmarkImage(landmarkId, files[0]);
                if (result === null) {
                    return res.status(400).json({
                        message: "Проверти id достопримечательности",
                    });
                }
                return res.json(result);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при добавления изображения" });
            }
        });
    }
}
exports.LandmarkController = LandmarkController;
