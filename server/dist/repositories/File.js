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
exports.FileRepository = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
class FileRepository {
    saveFile(filePath, buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield promises_1.default.writeFile(filePath, buffer);
                return filePath;
            }
            catch (error) {
                throw new Error(`File Repository: ${error}`);
            }
        });
    }
    processImage(inputPath, outputPath, quality, times) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (quality < 0 || quality > 100) {
                    throw new Error("Quality must be between 0 and 100");
                }
                const metadata = yield (0, sharp_1.default)(inputPath).metadata();
                if (metadata.width === undefined || metadata.height === undefined) {
                    throw new Error("Unable to retrieve image dimensions");
                }
                const newWidth = Math.floor(metadata.width / times);
                const newHeight = Math.floor(metadata.height / times);
                yield (0, sharp_1.default)(inputPath)
                    .resize(newWidth, newHeight)
                    .jpeg({ quality })
                    .toFile(outputPath);
                return outputPath;
            }
            catch (error) {
                throw new Error(`File Repository: ${error}`);
            }
        });
    }
    getIMG(image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imagePath = path_1.default.join("public", "img", image);
                yield promises_1.default.access(imagePath, promises_1.default.constants.F_OK);
                const data = yield promises_1.default.readFile(imagePath);
                return data;
            }
            catch (error) {
                throw new Error("FILE NOT FOUND");
            }
        });
    }
    deleteImage(image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imagePath = path_1.default.join("public", "img", image);
                yield promises_1.default.rm(imagePath);
                return;
            }
            catch (error) {
                throw new Error(`File Repository: ${error}`);
            }
        });
    }
}
exports.FileRepository = FileRepository;
