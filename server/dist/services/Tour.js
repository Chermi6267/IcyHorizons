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
exports.TourService = void 0;
const Tour_1 = require("../repositories/Tour");
const tourRepository = new Tour_1.TourRepository();
class TourService {
    getAllTours() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tours = yield tourRepository.getAllTours();
                return tours;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tour = yield tourRepository.getById(id);
                return tour;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createTour(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tour = yield tourRepository.createTour(options);
                return tour;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteTour(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tour = yield tourRepository.deleteTour(id);
                return tour;
            }
            catch (error) {
                throw error;
            }
        });
    }
    appendOrRemoveLandmark(tourId, landmarkId, method) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield tourRepository.appendOrRemoveLandmark(tourId, landmarkId, method);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.TourService = TourService;
