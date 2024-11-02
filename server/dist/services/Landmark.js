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
exports.LandmarkService = void 0;
const path_1 = __importDefault(require("path"));
const Landmark_1 = require("../repositories/Landmark");
const uuid_1 = require("uuid");
const File_1 = require("../repositories/File");
const landmarkRepository = new Landmark_1.LandmarkRepository();
const fileRepository = new File_1.FileRepository();
class LandmarkService {
    getAllLandmarks(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [landmarks, totalCount] = yield Promise.all([
                    landmarkRepository.getLandmarks(page, limit),
                    landmarkRepository.getTotalCount(),
                ]);
                return { landmarks, totalCount };
            }
            catch (error) {
                throw error;
            }
        });
    }
    getLandmarksById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const landmarks = yield landmarkRepository.getLandmarkById(id);
                return landmarks;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getLandmarksByCat(catArray) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const landmarks = yield landmarkRepository.getLandmarkByCat(catArray);
                return landmarks;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getLandmarksByAdminCenterId(adminCenterId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const landmarks = yield landmarkRepository.getLandmarks(undefined, undefined, adminCenterId);
                return landmarks;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteLandmark(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield landmarkRepository.deleteLandmark(id);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createLandmark(data, files) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const landmarkPhotos = [];
                const landmarkPhotosBuffer = [];
                files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                    const fileUuid = (0, uuid_1.v4)();
                    const fileName = `${fileUuid}.jpg`;
                    landmarkPhotos.push({ photoPath: `${fileName}` });
                    landmarkPhotosBuffer.push(file.buffer);
                }));
                data["landmarkPhotos"] = landmarkPhotos;
                const newLandmark = yield landmarkRepository
                    .createLandmark(data)
                    .then((landmark) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    if (landmark !== null) {
                        (_a = data === null || data === void 0 ? void 0 : data.landmarkPhotos) === null || _a === void 0 ? void 0 : _a.forEach((photo, index) => __awaiter(this, void 0, void 0, function* () {
                            const filePath = path_1.default.join(__dirname, `../public/img/landmark/default/${photo.photoPath}`);
                            yield fileRepository
                                .saveFile(filePath, landmarkPhotosBuffer[index])
                                .then(() => __awaiter(this, void 0, void 0, function* () {
                                yield fileRepository.processImage(filePath, path_1.default.join(__dirname, `../public/img/landmark/small/${photo.photoPath}`), 5, 5);
                            }));
                        }));
                    }
                    return landmark;
                }));
                return newLandmark;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateLandmark(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedLandmark = yield landmarkRepository.updateLandmark(data);
                return updatedLandmark;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getImage(image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imgBuffer = yield fileRepository.getIMG(image);
                return imgBuffer;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteLandmarkImage(landmarkId, imageName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield landmarkRepository
                    .deleteLandmarkImage(landmarkId, imageName)
                    .then((landmark) => __awaiter(this, void 0, void 0, function* () {
                    if (landmark !== null) {
                        yield fileRepository.deleteImage(`/landmark/default/${imageName}`);
                        yield fileRepository.deleteImage(`/landmark/small/${imageName}`);
                        return landmark;
                    }
                    else {
                        return null;
                    }
                }));
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    addLandmarkImage(landmarkId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileName = `${(0, uuid_1.v4)()}.jpg`;
                image.originalname = fileName;
                const result = yield landmarkRepository
                    .addLandmarkImage(landmarkId, image)
                    .then((landmark) => __awaiter(this, void 0, void 0, function* () {
                    if (landmark !== null) {
                        const filePath = path_1.default.join(__dirname, `../public/img/landmark/default/${image.originalname}`);
                        yield fileRepository
                            .saveFile(filePath, image.buffer)
                            .then(() => __awaiter(this, void 0, void 0, function* () {
                            yield fileRepository.processImage(filePath, path_1.default.join(__dirname, `../public/img/landmark/small/${image.originalname}`), 5, 5);
                        }));
                    }
                    return landmark;
                }));
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.LandmarkService = LandmarkService;
