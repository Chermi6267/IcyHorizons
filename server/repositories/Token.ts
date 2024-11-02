import prisma from "./prismaClient";

// Repository for managing tokens
export class TokenRepository {
  // Repository for creating refresh session
  async createRefreshSession(userId: number, refreshToken: string) {
    try {
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          token: {
            create: {
              token: refreshToken,
            },
          },
        },
        select: {
          token: true,
        },
      });

      const token = user.token;

      return token;
    } catch (error) {
      throw new Error(`Ошибка при создании refresh токена: ${error}`);
    }
  }

  // Repository for updating refresh session
  async updateRefreshSession(userId: number, refreshToken: string) {
    try {
      // Check for refresh session
      const token = await prisma.token.findUnique({
        where: {
          userId: userId,
        },
      });

      if (token === null) {
        const newToken = await prisma.token.create({
          data: {
            userId: userId,
            token: refreshToken,
          },
        });

        return newToken;
      } else {
        const newToken = await prisma.token.update({
          where: {
            userId: userId,
          },
          data: {
            token: refreshToken,
          },
        });

        return newToken;
      }
    } catch (error) {
      throw new Error(`Ошибка при обновлении refresh токена: ${error}`);
    }
  }

  // Repository for deleting refresh session
  async deleteRefreshSession(refreshToken: string) {
    try {
      const token = await prisma.token.delete({
        where: {
          token: refreshToken,
        },
        select: {
          token: true,
        },
      });

      return token;
    } catch (error) {
      throw new Error(`Ошибка при удалении refresh токена: ${error}`);
    }
  }
}
