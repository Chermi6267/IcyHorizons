import api from "@/http/api";
import { IRegHandler } from "@/interfaces/registration";

export async function regHandler({ data }: IRegHandler): Promise<string> {
  try {
    const result = await api.post(`/auth/registration`, {
      name: data.name,
      avatar: data.avatar,
      email: data.email,
      password: data.password,
      loggedWith: data.loggedWith,
    });

    console.log(result.config);
    const accessToken = result.data.accessToken as string;

    return accessToken;
  } catch (error: any) {
    throw new Error(
      error.response.data.message
        ? error.response.data.message
        : "Ошибка при регистрации пользователя"
    );
  }
}
