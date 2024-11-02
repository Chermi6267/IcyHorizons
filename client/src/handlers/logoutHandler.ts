import api from "@/http/api";

export async function logoutHandler() {
  try {
    await api.get(`/auth/logout`);

    return;
  } catch (error: any) {
    console.error(error);
  }
}
