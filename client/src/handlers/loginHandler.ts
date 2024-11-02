import api from "@/http/api";
import { ILogHandler } from "@/interfaces/login";

export async function loginHandler({ data }: ILogHandler): Promise<string> {
  try {
    const result = await api.post(`/auth/login`, {
      email: data.email,
      password: data.password1,
      loggedWith: data.loggedWith,
    });

    const accessToken = result.data.accessToken as string;

    return accessToken;
  } catch (error: any) {
    throw new Error(
      error.response.data.message
        ? error.response.data.message
        : "Ошибка при входе пользователя"
    );
  }
}
