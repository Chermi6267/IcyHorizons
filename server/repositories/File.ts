import fs from "fs/promises";
import sharp from "sharp";
import path from "path";

export class FileRepository {
  async saveFile(filePath: string, buffer: Buffer) {
    try {
      await fs.writeFile(filePath, buffer);

      return filePath;
    } catch (error) {
      throw new Error(`File Repository: ${error}`);
    }
  }

  async processImage(
    inputPath: string,
    outputPath: string,
    quality: number,
    times: number
  ) {
    try {
      if (quality < 0 || quality > 100) {
        throw new Error("Quality must be between 0 and 100");
      }

      const metadata = await sharp(inputPath).metadata();

      if (metadata.width === undefined || metadata.height === undefined) {
        throw new Error("Unable to retrieve image dimensions");
      }

      const newWidth = Math.floor(metadata.width / times);
      const newHeight = Math.floor(metadata.height / times);

      await sharp(inputPath)
        .resize(newWidth, newHeight)
        .jpeg({ quality })
        .toFile(outputPath);

      return outputPath;
    } catch (error) {
      throw new Error(`File Repository: ${error}`);
    }
  }

  async getIMG(image: string) {
    try {
      const imagePath = path.join("public", "img", image);

      await fs.access(imagePath, fs.constants.F_OK);

      const data = await fs.readFile(imagePath);

      return data;
    } catch (error) {
      throw new Error("FILE NOT FOUND");
    }
  }

  async deleteImage(image: string) {
    try {
      const imagePath = path.join("public", "img", image);

      await fs.rm(imagePath);

      return;
    } catch (error) {
      throw new Error(`File Repository: ${error}`);
    }
  }
}
