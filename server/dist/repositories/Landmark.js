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
exports.LandmarkRepository = void 0;
const prismaClient_1 = __importDefault(require("./prismaClient"));
class LandmarkRepository {
    getLandmarks(page, limit, adminCenterId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const whereCondition = adminCenterId ? { adminCenterId } : undefined;
                const skip = page && limit ? (page - 1) * limit : undefined;
                const take = limit || undefined;
                const landmarks = yield prismaClient_1.default.landmark.findMany({
                    where: whereCondition,
                    skip,
                    take,
                    select: {
                        id: true,
                        name: true,
                        latitude: true,
                        longitude: true,
                        link: true,
                        description: true,
                        rating: true,
                        category: true,
                        landmarkPhoto: true,
                        comment: true,
                        adminCenter: true,
                    },
                });
                return landmarks;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    deleteLandmark(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidate = yield prismaClient_1.default.landmark.findUnique({
                    where: { id: id },
                });
                if (candidate === null) {
                    return null;
                }
                const result = yield prismaClient_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    // Delete related records
                    yield tx.landmarkPhoto.deleteMany({
                        where: { landmarkId: id },
                    });
                    yield tx.comment.deleteMany({
                        where: { landmarkId: id },
                    });
                    // Fetch all tours related to this landmark
                    const tours = yield tx.tour.findMany({
                        where: { landmark: { some: { id: id } } },
                    });
                    // Remove the association between the tours and the landmark
                    for (const tour of tours) {
                        yield tx.tour.update({
                            where: { id: tour.id },
                            data: {
                                landmark: {
                                    disconnect: { id: id },
                                },
                            },
                        });
                    }
                    // Finally, delete the landmark
                    const deletedLandmark = yield tx.landmark.delete({
                        where: { id: id },
                    });
                    return deletedLandmark;
                }));
                return result;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    getLandmarkById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const landmark = yield prismaClient_1.default.landmark.findUnique({
                    where: { id: id },
                    select: {
                        id: true,
                        name: true,
                        latitude: true,
                        longitude: true,
                        link: true,
                        description: true,
                        rating: true,
                        category: true,
                        landmarkPhoto: true,
                        comment: true,
                        adminCenter: true,
                    },
                });
                return landmark;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    getLandmarkByCat(catArray) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const landmark = yield prismaClient_1.default.landmark.findMany({
                    where: { category: { some: { id: { in: catArray } } } },
                    select: {
                        id: true,
                        name: true,
                        latitude: true,
                        longitude: true,
                        link: true,
                        description: true,
                        rating: true,
                        category: true,
                        landmarkPhoto: true,
                        comment: true,
                        adminCenter: true,
                    },
                });
                return landmark;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    getTotalCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield prismaClient_1.default.landmark.count();
                return count;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    createLandmark(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidate = yield prismaClient_1.default.landmark.findFirst({
                    where: {
                        OR: [{ name: data.name }, { link: data.link }],
                    },
                });
                if (candidate !== null) {
                    return null;
                }
                const catIdList = data.catId.map((element) => {
                    return { id: element };
                });
                const landmark = yield prismaClient_1.default.landmark.create({
                    data: {
                        name: data.name,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        link: data.link,
                        description: data.description,
                        rating: data.rating || 0,
                        adminCenterId: data.adminCenterId,
                        category: {
                            connect: catIdList,
                        },
                        landmarkPhoto: data.landmarkPhotos
                            ? {
                                create: data.landmarkPhotos.map((photo) => ({
                                    photoPath: photo.photoPath,
                                })),
                            }
                            : {},
                    },
                });
                return landmark;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const catList = yield prismaClient_1.default.category.findMany();
                return catList;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    updateLandmark(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            try {
                const candidate = yield prismaClient_1.default.landmark.findUnique({
                    where: { id: data.id },
                    select: {
                        id: true,
                        name: true,
                        latitude: true,
                        longitude: true,
                        link: true,
                        description: true,
                        rating: true,
                        category: true,
                        adminCenterId: true,
                    },
                });
                if (candidate === null) {
                    return null;
                }
                const landmark = yield prismaClient_1.default.landmark.update({
                    where: { id: data.id },
                    data: {
                        name: data.name !== undefined ? data.name : candidate.name,
                        latitude: data.latitude !== undefined ? data.latitude : candidate.latitude,
                        longitude: data.longitude !== undefined ? data.longitude : candidate.longitude,
                        link: data.link !== undefined ? data.link : candidate.link,
                        description: data.description !== undefined
                            ? data.description
                            : candidate.description,
                        rating: data.rating !== undefined ? data.rating : candidate.rating,
                        adminCenterId: data.adminCenterId !== undefined
                            ? data.adminCenterId
                            : candidate.adminCenterId,
                        category: data.catId
                            ? {
                                disconnect: candidate.category,
                                connect: data.catId.map((element) => {
                                    console.log(element);
                                    return { id: element };
                                }),
                            }
                            : {
                                connect: candidate.category.map((element) => {
                                    return { id: element.id };
                                }),
                            },
                    },
                });
                return landmark;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    deleteLandmarkImage(landmarkId, imageName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidate = yield prismaClient_1.default.landmark.findUnique({
                    where: { id: landmarkId },
                });
                if (candidate === null) {
                    return null;
                }
                try {
                    const update = yield prismaClient_1.default.landmark.update({
                        where: { id: landmarkId },
                        data: {
                            landmarkPhoto: {
                                delete: {
                                    photoPath: imageName,
                                },
                            },
                        },
                    });
                    return update;
                }
                catch (error) {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
    addLandmarkImage(landmarkId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidate = yield prismaClient_1.default.landmark.findUnique({
                    where: { id: landmarkId },
                });
                if (candidate === null) {
                    return null;
                }
                const result = yield prismaClient_1.default.landmark.update({
                    where: { id: landmarkId },
                    data: {
                        landmarkPhoto: {
                            create: { photoPath: image.originalname },
                        },
                    },
                });
                return result;
            }
            catch (error) {
                throw new Error(`Repository: ${error}`);
            }
        });
    }
}
exports.LandmarkRepository = LandmarkRepository;
