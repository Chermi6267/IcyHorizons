import path from "path";
import { ILandmark, IUpdateLandmark } from "../interfaces/Landmark";
import { LandmarkRepository } from "../repositories/Landmark";
import { v4 as uuidv4 } from "uuid";
import { FileRepository } from "../repositories/File";

const landmarkRepository = new LandmarkRepository();
const fileRepository = new FileRepository();

export class LandmarkService {
  async getAdminCenter(adminCenterId: string) {
    try {
      const result = await landmarkRepository.getAdminCenterData(adminCenterId);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllLandmarks(page: number, limit: number) {
    try {
      const [landmarks, totalCount] = await Promise.all([
        landmarkRepository.getAllLandmarks(page, limit),
        landmarkRepository.getTotalCount(),
      ]);

      return { landmarks, totalCount };
    } catch (error) {
      throw error;
    }
  }

  async getLandmarksById(id: number) {
    try {
      const landmarks = await landmarkRepository.getLandmarkById(id);

      return landmarks;
    } catch (error) {
      throw error;
    }
  }

  async getLandmarksByCat(catArray: number[], adminCenterId: string) {
    try {
      const [landmarks, adminCenter] = await Promise.all([
        landmarkRepository.getLandmarkByCat(catArray, adminCenterId),
        landmarkRepository.getAdminCenterData(adminCenterId),
      ]);

      return { landmarks, adminCenter };
    } catch (error) {
      throw error;
    }
  }

  async getLandmarksByAdminCenterId(adminCenterId: string) {
    try {
      const [landmarks, adminCenter] = await Promise.all([
        landmarkRepository.getLandmarksByAdminCenterId(adminCenterId),
        landmarkRepository.getAdminCenterData(adminCenterId),
      ]);

      return { landmarks, adminCenter };
    } catch (error) {
      throw error;
    }
  }

  async deleteLandmark(id: number) {
    try {
      const result = await landmarkRepository.deleteLandmark(id);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createLandmark(data: ILandmark, files: Express.Multer.File[]) {
    try {
      type LandmarkPhotos = ILandmark["landmarkPhotos"];
      const landmarkPhotos: LandmarkPhotos = [];
      const landmarkPhotosBuffer: Buffer[] = [];

      files.forEach(async (file) => {
        const fileUuid = uuidv4();
        const fileName = `${fileUuid}.jpg`;

        landmarkPhotos.push({ photoPath: `${fileName}` });
        landmarkPhotosBuffer.push(file.buffer);
      });

      data["landmarkPhotos"] = landmarkPhotos;

      const newLandmark = await landmarkRepository
        .createLandmark(data)
        .then(async (landmark) => {
          if (landmark !== null) {
            data?.landmarkPhotos?.forEach(async (photo, index) => {
              const filePath = path.join(
                __dirname,
                `../public/img/landmark/default/${photo.photoPath}`
              );

              await fileRepository
                .saveFile(filePath, landmarkPhotosBuffer[index])
                .then(async () => {
                  await fileRepository.processImage(
                    filePath,
                    path.join(
                      __dirname,
                      `../public/img/landmark/small/${photo.photoPath}`
                    ),
                    1,
                    15
                  );
                });
            });
          }

          return landmark;
        });

      return newLandmark;
    } catch (error) {
      throw error;
    }
  }

  async updateLandmark(data: IUpdateLandmark) {
    try {
      const updatedLandmark = await landmarkRepository.updateLandmark(data);

      return updatedLandmark;
    } catch (error) {
      throw error;
    }
  }

  async getImage(image: string) {
    try {
      const imgBuffer = await fileRepository.getIMG(path.join("img", image));

      return imgBuffer;
    } catch (error) {
      throw error;
    }
  }

  async deleteLandmarkImage(landmarkId: number, imageName: string) {
    try {
      const result = await landmarkRepository
        .deleteLandmarkImage(landmarkId, imageName)
        .then(async (landmark) => {
          if (landmark !== null) {
            await fileRepository.deleteImage(`/landmark/default/${imageName}`);
            await fileRepository.deleteImage(`/landmark/small/${imageName}`);

            return landmark;
          } else {
            return null;
          }
        });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async addLandmarkImage(landmarkId: number, image: Express.Multer.File) {
    try {
      const fileName = `${uuidv4()}.jpg`;
      image.originalname = fileName;

      const result = await landmarkRepository
        .addLandmarkImage(landmarkId, image)
        .then(async (landmark) => {
          if (landmark !== null) {
            const filePath = path.join(
              __dirname,
              `../public/img/landmark/default/${image.originalname}`
            );

            await fileRepository
              .saveFile(filePath, image.buffer)
              .then(async () => {
                await fileRepository.processImage(
                  filePath,
                  path.join(
                    __dirname,
                    `../public/img/landmark/small/${image.originalname}`
                  ),
                  1,
                  15
                );
              });
          }

          return landmark;
        });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
