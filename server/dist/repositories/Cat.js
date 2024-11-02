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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatRepository = void 0;
const prismaClient_1 = __importDefault(require("./prismaClient"));
class CatRepository {
    getAllCats() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cats = yield prismaClient_1.default.category.findMany();
                return cats;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    createCat(catName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const catCandidate = yield prismaClient_1.default.category.findUnique({
                    where: {
                        name: catName,
                    },
                });
                if (catCandidate !== null) {
                    return null;
                }
                const cat = yield prismaClient_1.default.category.create({
                    data: {
                        name: catName,
                    },
                });
                return cat;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    modifyCat(catId, catName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const catCandidate = yield prismaClient_1.default.category.findUnique({
                    where: {
                        id: catId,
                    },
                });
                if (catCandidate === null) {
                    return null;
                }
                const cat = yield prismaClient_1.default.category.update({
                    where: {
                        id: catId,
                    },
                    data: {
                        name: catName,
                    },
                });
                return cat;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    deleteCat(catId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const catCandidate = yield prismaClient_1.default.category.findUnique({
                    where: {
                        id: catId,
                    },
                });
                if (catCandidate === null) {
                    return null;
                }
                const cat = yield prismaClient_1.default.category.delete({
                    where: {
                        id: catId,
                    },
                });
                return cat;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
}
exports.CatRepository = CatRepository;
