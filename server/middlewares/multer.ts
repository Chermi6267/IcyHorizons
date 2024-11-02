import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

// Define the file filter
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimeType && extname) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type") as any, false);
  }
};

// Configure multer
const upload = multer({
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

// Middleware to handle file upload and check for errors
export function multerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  upload.array("files", 10)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Handle multer-specific errors
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // Handle other errors
      return res.status(400).json({ message: err.message });
    }

    next();
  });
}
