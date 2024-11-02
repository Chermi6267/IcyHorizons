import { connect } from "http2";
import { ITour } from "../interfaces/Tour";
import prisma from "./prismaClient";

export class TourRepository {
  async getAllTours() {
    try {
      const tours = await prisma.tour.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          landmark: true,
        },
      });

      return tours;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async getById(id: number) {
    try {
      const tours = await prisma.tour.findUnique({
        where: { id: id },
        select: {
          id: true,
          title: true,
          description: true,
          landmark: true,
        },
      });

      return tours;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async createTour(options: ITour) {
    try {
      const candidate = await prisma.tour.findUnique({
        where: { title: options.title },
      });

      if (candidate !== null) {
        return "TITLE";
      }

      try {
        return await prisma.landmark
          .findMany({
            where: { id: { in: options.landmarks } },
          })
          .then(async (result) => {
            const newTour = await prisma.tour.create({
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
          });
      } catch (error) {
        return "LANDMARKS";
      }
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async deleteTour(id: number) {
    try {
      const candidate = await prisma.tour.findUnique({
        where: { id: id },
      });

      if (candidate === null) {
        return null;
      }
      const tour = await prisma.tour.delete({ where: { id: id } });

      return tour;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async appendOrRemoveLandmark(
    tourId: number,
    landmarkId: number,
    method: "APPEND" | "REMOVE"
  ) {
    try {
      const tourCandidate = await prisma.tour.findUnique({
        where: { id: tourId },
      });

      if (tourCandidate === null) {
        return "TOUR";
      }

      const landmarkCandidate = await prisma.landmark.findUnique({
        where: { id: landmarkId },
      });

      if (landmarkCandidate === null) {
        return "LANDMARK";
      }

      const tour = await prisma.tour.update({
        where: { id: tourId },
        data: {
          landmark:
            method === "APPEND"
              ? { connect: { id: landmarkId } }
              : {
                  disconnect: { id: landmarkId },
                },
        },
      });

      return tour;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }
}
