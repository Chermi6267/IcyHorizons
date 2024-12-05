import prisma from "./prismaClient";
import { IReg } from "../interfaces/User";

const funnyNicknames = [
  "Тяжеловоз",
  "Бегемотик",
  "Пельмень",
  "Чебурек",
  "Сметанкин",
  "Колобок",
  "Капустник",
  "Сушняк",
  "Котейка",
  "Креветка",
  "Зефирка",
  "Бутылкин",
  "Грозный",
  "Мармелад",
  "Горшочек",
  "Бургер",
  "Чебупель",
  "Люля",
  "Круассан",
  "Дынька",
  "Арбузик",
  "Тортилла",
  "Пончиков",
  "Кефирчик",
  "Кексик",
  "Молочник",
  "Блинчик",
  "Рыжик",
  "Тостер",
  "Чайничек",
  "Супчик",
  "Плюшка",
  "Хрюшка",
  "Карамелька",
  "Печенька",
  "Пампушка",
  "Солнышко",
  "Сосисон",
  "Рулетик",
  "Мякиш",
  "Пловец",
  "Шашлычок",
  "Гренка",
  "Тыквёнок",
  "Шницель",
  "Жаренок",
  "Панкейк",
  "Мишутка",
  "Тефтелька",
  "Крабик",
  "Лимончик",
  "Медок",
  "Печенюха",
  "Йогуртик",
  "Фрикаделька",
  "Карамельный",
  "Сырок",
  "Чудо-Юдо",
  "Зайчонок",
  "Облачко",
  "Семечка",
  "Ягодка",
  "Кексон",
  "Фасолинка",
  "Пухляш",
];

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
              name:
                name === "" || name === undefined
                  ? funnyNicknames[
                      Math.floor(Math.random() * funnyNicknames.length)
                    ]
                  : name,
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
