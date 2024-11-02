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
exports.CatService = void 0;
const Cat_1 = require("../repositories/Cat");
const catRepository = new Cat_1.CatRepository();
class CatService {
    getAllCats() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cats = yield catRepository.getAllCats();
                return cats;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createCat(catName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cat = yield catRepository.createCat(catName);
                return cat;
            }
            catch (error) {
                throw error;
            }
        });
    }
    modifyCat(catId, catName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cat = yield catRepository.modifyCat(catId, catName);
                return cat;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteCat(catId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cat = yield catRepository.deleteCat(catId);
                return cat;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CatService = CatService;
