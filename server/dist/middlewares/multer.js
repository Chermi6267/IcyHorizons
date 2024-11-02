"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerMiddleware = multerMiddleware;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Define the file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    if (mimeType && extname) {
        cb(null, true);
    }
    else {
        cb(new Error("Unsupported file type"), false);
    }
};
// Configure multer
const upload = (0, multer_1.default)({
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});
// Middleware to handle file upload and check for errors
function multerMiddleware(req, res, next) {
    upload.array("files", 10)(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            // Handle multer-specific errors
            return res.status(400).json({ message: err.message });
        }
        else if (err) {
            // Handle other errors
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}
