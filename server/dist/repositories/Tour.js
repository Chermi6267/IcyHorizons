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
exports.TourRepository = void 0;
const prismaClient_1 = __importDefault(require("./prismaClient"));
class TourRepository {
    getAllTours() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tours = yield prismaClient_1.default.tour.findMany({
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        landmark: true,
                    },
                });
                return tours;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tours = yield prismaClient_1.default.tour.findUnique({
                    where: { id: id },
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        landmark: true,
                    },
                });
                return tours;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    createTour(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidate = yield prismaClient_1.default.tour.findUnique({
                    where: { title: options.title },
                });
                if (candidate !== null) {
                    return "TITLE";
                }
                try {
                    return yield prismaClient_1.default.landmark
                        .findMany({
                        where: { id: { in: options.landmarks } },
                    })
                        .then((result) => __awaiter(this, void 0, void 0, function* () {
                        const newTour = yield prismaClient_1.default.tour.create({
                            data: {
                                title: options.title,
                                description: options.description,
                                landmark: {
                                    connect: options.landmarks.map((landmark) => {
                                        return { id: landmark };
                                    }),
                                },
                            },
                        });
                        return newTour;
                    }));
                }
                catch (error) {
                    return "LANDMARKS";
                }
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    deleteTour(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidate = yield prismaClient_1.default.tour.findUnique({
                    where: { id: id },
                });
                if (candidate === null) {
                    return null;
                }
                const tour = yield prismaClient_1.default.tour.delete({ where: { id: id } });
                return tour;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    appendOrRemoveLandmark(tourId, landmarkId, method) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tourCandidate = yield prismaClient_1.default.tour.findUnique({
                    where: { id: tourId },
                });
                if (tourCandidate === null) {
                    return "TOUR";
                }
                const landmarkCandidate = yield prismaClient_1.default.landmark.findUnique({
                    where: { id: landmarkId },
                });
                if (landmarkCandidate === null) {
                    return "LANDMARK";
                }
                const tour = yield prismaClient_1.default.tour.update({
                    where: { id: tourId },
                    data: {
                        landmark: method === "APPEND"
                            ? { connect: { id: landmarkId } }
                            : {
                                disconnect: { id: landmarkId },
                            },
                    },
                });
                return tour;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
}
exports.TourRepository = TourRepository;
