import prisma from "./prismaClient";
import { IReg } from "../interfaces/User";

export class AuthRepository {
  // Get user
  async getUser(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          email: true,
          role: true,
          hashPassword: true,
          loggedWith: true,
          profile: true,
          token: true,
        },
      });

      return user;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }

  // Create user
  async createUser(options: Omit<IReg, "sub">) {
    try {
      const { email, password, loggedWith, name, avatar } = options;

      const user = await prisma.user.create({
        data: {
          email: email,
          hashPassword: password,
          role: {
            connect: {
              name: "USER",
            },
          },
          loggedWith: loggedWith,
          profile: {
            create: {
              name: name,
              avatar: avatar,
            },
          },
        },
        select: {
          id: true,
          email: true,
          role: true,
          loggedWith: true,
          profile: true,
        },
      });

      return user;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }
  async getAllUsers() {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          loggedWith: true,
          role: true,
          profile: true,
        },
      });

      return users;
    } catch (error) {
      throw new Error(`Repository: ${error}`);
    }
  }
}
