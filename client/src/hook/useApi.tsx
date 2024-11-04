import axios, { AxiosInstance } from "axios";
import { useEffect, useState } from "react";

let api: AxiosInstance | null = null;

export const useApi = () => {
  const [instance, setInstance] = useState<AxiosInstance | null>(null);

  useEffect(() => {
    const createApiInstance = () => {
      const axiosInstance = axios.create({
        withCredentials: true,
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      });

      // Installing access token in headers for each request
      axiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          "token"
        )}`;

        return config;
      });

      // Handling access token updates
      axiosInstance.interceptors.response.use(
        (config) => config,
        async (error) => {
          const originalRequest = error.config;

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
                process.env.NEXT_PUBLIC_SERVER_URL + "/auth/refreshToken",
                {},
                { withCredentials: true }
              );

              localStorage.setItem("token", response.data["accessToken"]);
              console.log("ACCESS TOKEN ОБНОВЛЁН");

              return axiosInstance.request(originalRequest);
            } catch (error) {
              console.log("НЕ АВТОРИЗОВАН");
            }
          }

          throw error;
        }
      );

      setInstance(axiosInstance);
    };

    if (typeof window !== "undefined") {
      createApiInstance();
    }
  }, []);
  return instance;
};
