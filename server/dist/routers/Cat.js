"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catRouter = void 0;
const express_1 = require("express");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAdmin_1 = require("../middlewares/isAdmin");
const express_validator_1 = require("express-validator");
const Cat_1 = require("../controllers/Cat");
const catController = new Cat_1.CatController();
exports.catRouter = (0, express_1.Router)();
exports.catRouter.get("/all", catController.getAllCats);
exports.catRouter.post("/create", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, [(0, express_validator_1.check)("name", "Неправильный формат имени категории").notEmpty()], catController.createCat);
exports.catRouter.put("/modify", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, [
    (0, express_validator_1.check)("name", "Неправильный формат имени категории").notEmpty(),
    (0, express_validator_1.check)("catId", "Неправильный формат id категории").notEmpty().isInt(),
], catController.modifyCat);
exports.catRouter.delete("/delete/:catId", isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin, [(0, express_validator_1.check)("catId", "Неправильный формат id категории").notEmpty().isInt()], catController.deleteCat);
