"use client";

import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

// Installing access token in headers for each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handling access token updates
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    // Проверка, что response существует и содержит статус
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      console.log("401");
      try {
        originalRequest._isRetry = true;

        const response = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/auth/refreshAccessToken",
          {},
          { withCredentials: true }
        );

        localStorage.setItem("token", response.data["accessToken"]);
        console.log("ACCESS TOKEN ОБНОВЛЁН");

        return api.request(originalRequest);
      } catch (error) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }

    throw error;
  }
);

export default api;
