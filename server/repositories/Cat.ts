import prisma from "./prismaClient";

export class CatRepository {
  async getAllCats() {
    try {
      const cats = await prisma.category.findMany();

      return cats;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async createCat(catName: string) {
    try {
      const catCandidate = await prisma.category.findUnique({
        where: {
          name: catName,
        },
      });

      if (catCandidate !== null) {
        return null;
      }

      const cat = await prisma.category.create({
        data: {
          name: catName,
        },
      });

      return cat;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async modifyCat(catId: number, catName: string) {
    try {
      const catCandidate = await prisma.category.findUnique({
        where: {
          id: catId,
        },
      });

      if (catCandidate === null) {
        return null;
      }

      const cat = await prisma.category.update({
        where: {
          id: catId,
        },
        data: {
          name: catName,
        },
      });

      return cat;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  async deleteCat(catId: number) {
    try {
      const catCandidate = await prisma.category.findUnique({
        where: {
          id: catId,
        },
      });

      if (catCandidate === null) {
        return null;
      }

      const cat = await prisma.category.delete({
        where: {
          id: catId,
        },
      });

      return cat;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }
}
