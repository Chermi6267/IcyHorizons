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
exports.CatController = void 0;
const Cat_1 = require("../services/Cat");
const express_validator_1 = require("express-validator");
const catService = new Cat_1.CatService();
class CatController {
    getAllCats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cats = yield catService.getAllCats();
                return res.json(cats);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при получении всех категорий" });
            }
        });
    }
    createCat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validation of the Registration Form
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (validationErrors["errors"].length !== 0) {
                    return res
                        .status(422)
                        .json({ message: validationErrors["errors"][0]["msg"] });
                }
                const catName = req.body.name;
                const cat = yield catService.createCat(catName);
                if (cat === null) {
                    return res
                        .status(400)
                        .json({ message: "Категория с этим именем уже существует" });
                }
                return res.json(cat);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при получении всех категорий" });
            }
        });
    }
    modifyCat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validation of the Registration Form
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (validationErrors["errors"].length !== 0) {
                    return res
                        .status(422)
                        .json({ message: validationErrors["errors"][0]["msg"] });
                }
                const catName = req.body.name;
                const catId = parseInt(req.body.catId, 10);
                const cat = yield catService.modifyCat(catId, catName);
                if (cat === null) {
                    return res
                        .status(404)
                        .json({ message: `Категория с id = ${catId} не найдена` });
                }
                return res.json(cat);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при получении всех категорий" });
            }
        });
    }
    deleteCat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validation of the Registration Form
                const validationErrors = (0, express_validator_1.validationResult)(req);
                if (validationErrors["errors"].length !== 0) {
                    return res
                        .status(422)
                        .json({ message: validationErrors["errors"][0]["msg"] });
                }
                const catId = parseInt(req.params.catId, 10);
                const cat = yield catService.deleteCat(catId);
                if (cat === null) {
                    return res
                        .status(404)
                        .json({ message: `Категория с id = ${catId} не найдена` });
                }
                return res.json(cat);
            }
            catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: "Ошибка при получении всех категорий" });
            }
        });
    }
}
exports.CatController = CatController;
