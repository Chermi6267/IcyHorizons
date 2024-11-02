import { ITour } from "../interfaces/Tour";
import { TourRepository } from "../repositories/Tour";

const tourRepository = new TourRepository();

export class TourService {
  async getAllTours() {
    try {
      const tours = await tourRepository.getAllTours();

      return tours;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const tour = await tourRepository.getById(id);

      return tour;
    } catch (error) {
      throw error;
    }
  }

  async createTour(options: ITour) {
    try {
      const tour = await tourRepository.createTour(options);

      return tour;
    } catch (error) {
      throw error;
    }
  }

  async deleteTour(id: number) {
    try {
      const tour = await tourRepository.deleteTour(id);

      return tour;
    } catch (error) {
      throw error;
    }
  }

  async appendOrRemoveLandmark(
    tourId: number,
    landmarkId: number,
    method: "APPEND" | "REMOVE"
  ) {
    try {
      const result = await tourRepository.appendOrRemoveLandmark(
        tourId,
        landmarkId,
        method
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
}
