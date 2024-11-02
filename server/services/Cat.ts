import { CatRepository } from "../repositories/Cat";

const catRepository = new CatRepository();

export class CatService {
  async getAllCats() {
    try {
      const cats = await catRepository.getAllCats();

      return cats;
    } catch (error) {
      throw error;
    }
  }

  async createCat(catName: string) {
    try {
      const cat = await catRepository.createCat(catName);

      return cat;
    } catch (error) {
      throw error;
    }
  }

  async modifyCat(catId: number, catName: string) {
    try {
      const cat = await catRepository.modifyCat(catId, catName);

      return cat;
    } catch (error) {
      throw error;
    }
  }

  async deleteCat(catId: number) {
    try {
      const cat = await catRepository.deleteCat(catId);

      return cat;
    } catch (error) {
      throw error;
    }
  }
}
