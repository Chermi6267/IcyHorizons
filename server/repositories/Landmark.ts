import prisma from "./prismaClient";
import { ILandmark, IUpdateLandmark } from "../interfaces/Landmark";

export class LandmarkRepository {
  async getAllLandmarks(page?: number, limit?: number) {
    try {
      const skip = page && limit ? (page - 1) * limit : undefined;
      const take = limit || undefined;

      const landmarks = await prisma.landmark.findMany({
        where: {
          NOT: {
            adminCenterId: "ALL",
          },
        },
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
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async getLandmarksByAdminCenterId(adminCenterId: string) {
    try {
      const landmarks = await prisma.landmark.findMany({
        where: { adminCenterId: adminCenterId },
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
        },
        orderBy: {
          rating: "desc",
        },
      });

      return landmarks;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async getAdminCenterData(adminCenterId: string) {
    try {
      const data = await prisma.adminCenter.findUnique({
        where: {
          id: adminCenterId,
        },
      });

      return data;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async deleteLandmark(id: number) {
    try {
      const candidate = await prisma.landmark.findUnique({
        where: { id: id },
      });

      if (candidate === null) {
        return null;
      }

      const result = await prisma.$transaction(async (tx) => {
        // Delete related records
        await tx.landmarkPhoto.deleteMany({
          where: { landmarkId: id },
        });
        await tx.comment.deleteMany({
          where: { landmarkId: id },
        });

        // Fetch all tours related to this landmark
        const tours = await tx.tour.findMany({
          where: { landmark: { some: { id: id } } },
        });

        // Remove the association between the tours and the landmark
        for (const tour of tours) {
          await tx.tour.update({
            where: { id: tour.id },
            data: {
              landmark: {
                disconnect: { id: id },
              },
            },
          });
        }

        // Finally, delete the landmark
        const deletedLandmark = await tx.landmark.delete({
          where: { id: id },
        });

        return deletedLandmark;
      });

      return result;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async getLandmarkById(id: number) {
    try {
      const landmark = await prisma.landmark.findUnique({
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
          comment: {
            select: {
              text: true,
              createdAt: true,
              updatedAt: true,
              landmarkId: true,
              stars: true,
              id: true,
              user: {
                select: {
                  email: true,
                  profile: {
                    select: {
                      name: true,
                      avatar: true,
                    },
                  },
                },
              },
            },
          },
          adminCenter: true,
        },
      });

      return landmark;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async getLandmarkByCat(catArray: number[], adminCenterId: string) {
    try {
      if (adminCenterId === "ALL") {
        const landmark = await prisma.landmark.findMany({
          where: {
            category: { some: { id: { in: catArray } } },
          },
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
      } else {
        const landmark = await prisma.landmark.findMany({
          where: {
            AND: {
              category: { some: { id: { in: catArray } } },
              adminCenterId: adminCenterId,
            },
          },
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
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async getTotalCount() {
    try {
      const count = await prisma.landmark.count();
      return count;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async createLandmark(data: ILandmark) {
    try {
      const candidate = await prisma.landmark.findFirst({
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

      const landmark = await prisma.landmark.create({
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
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async getCategories() {
    try {
      const catList = await prisma.category.findMany();

      return catList;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async updateLandmark(data: IUpdateLandmark) {
    try {
      const candidate = await prisma.landmark.findUnique({
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

      const landmark = await prisma.landmark.update({
        where: { id: data.id },
        data: {
          name: data.name !== undefined ? data.name : candidate.name,

          latitude:
            data.latitude !== undefined ? data.latitude : candidate.latitude,

          longitude:
            data.longitude !== undefined ? data.longitude : candidate.longitude,

          link: data.link !== undefined ? data.link : candidate.link,

          description:
            data.description !== undefined
              ? data.description
              : candidate.description,

          rating: data.rating !== undefined ? data.rating : candidate.rating,

          adminCenterId:
            data.adminCenterId !== undefined
              ? data.adminCenterId
              : candidate.adminCenterId,

          category: data.catId
            ? {
                disconnect: candidate.category,
                connect: data.catId.map((element) => {
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
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async deleteLandmarkImage(landmarkId: number, imageName: string) {
    try {
      const candidate = await prisma.landmark.findUnique({
        where: { id: landmarkId },
      });

      if (candidate === null) {
        return null;
      }

      try {
        const update = await prisma.landmark.update({
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
      } catch (error) {
        return null;
      }
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async addLandmarkImage(landmarkId: number, image: Express.Multer.File) {
    try {
      const candidate = await prisma.landmark.findUnique({
        where: { id: landmarkId },
      });

      if (candidate === null) {
        return null;
      }

      const result = await prisma.landmark.update({
        where: { id: landmarkId },
        data: {
          landmarkPhoto: {
            create: { photoPath: image.originalname },
          },
        },
      });

      return result;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }
}
