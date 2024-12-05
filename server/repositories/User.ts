import prisma from "./prismaClient";

export class UserRepository {
  async changeName(userId: number, newName: string) {
    try {
      const candidate = await prisma.user.findUnique({ where: { id: userId } });

      if (candidate === null) {
        return "USER";
      }
      const result = await prisma.profile.update({
        where: { userId: userId },
        data: { name: newName },
      });

      return result;
    } catch (error) {
      throw Error(`Repository: ${error}`);
    }
  }

  async changeAvatar(userId: number, fileName: string) {
    try {
      const candidate = await prisma.user.findUnique({ where: { id: userId } });

      if (candidate === null) {
        return "USER";
      }
      const result = await prisma.profile.update({
        where: { userId: userId },
        data: {
          avatar: `${process.env.IMG_PROTOCOL}://${process.env.IMG_URL}:${process.env.IMG_PORT}/user/avatar/${fileName}`,
        },
      });

      return result;
    } catch (error) {
      throw Error(`Repository: ${error}`);
    }
  }

  async changeHeader(userId: number, fileName: string) {
    try {
      const candidate = await prisma.user.findUnique({ where: { id: userId } });

      if (candidate === null) {
        return "USER";
      }
      const result = await prisma.profile.update({
        where: { userId: userId },
        data: {
          header: `${process.env.IMG_PROTOCOL}://${process.env.IMG_URL}:${process.env.IMG_PORT}/user/header/${fileName}`,
        },
      });

      return result;
    } catch (error) {
      throw Error(`Repository: ${error}`);
    }
  }

  async getUserData(userId: number) {
    try {
      const candidate = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          role: true,
          loggedWith: true,
        },
      });

      if (candidate === null) {
        return "USER";
      } else {
        return candidate;
      }
    } catch (error) {
      throw Error(`Repository: ${error}`);
    }
  }
}
