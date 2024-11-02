"use client";

import AuthMenu from "@/components/auth/authMenu";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./styles.module.scss";
import api from "@/http/api";

interface Props {}

const getAccessTokenHandler = async () => {
  await api.post("/auth/refreshAccessToken").then((res) => {
    localStorage.setItem("token", res.data.accessToken);
  });
};

function AuthPage(props: Props) {
  const {} = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [customError, setCustomError] = useState(searchParams.get("error"));
  const [status, setStatus] = useState(searchParams.get("status"));

  useEffect(() => {
    if (customError) {
      toast.error(
        "Ошибка авторизации. Убедитесь, что почта не используется с паролем.",
        {
          id: "1",

          style: {
            backgroundColor: "rgba(65, 67, 112, 0.25)",
            outline: "2px solid rgba(65, 67, 112, 1)",
            color: "white",
            backdropFilter: "blur(5px)",
          },

          iconTheme: {
            primary: "#eb4335",
            secondary: "white",
          },
        }
      );

      setCustomError(null);
      router.replace("/auth");
    }

    if (status) {
      toast.promise(
        getAccessTokenHandler().then(() => router.push("/")),
        {
          loading: "Перенаправление",
          success: "ОК",
          error: "Что-то пошло не так.",
        },
        {
          id: "2",

          style: {
            backgroundColor: "rgba(65, 67, 112, 0.25)",
            outline: "2px solid rgba(65, 67, 112, 1)",
            color: "white",
            backdropFilter: "blur(2px)",
          },

          error: {
            iconTheme: {
              primary: "#eb4335",
              secondary: "white",
            },
          },

          iconTheme: {
            primary: "#a8cd9f",
            secondary: "white",
          },
        }
      );

      setStatus(null);
      router.replace("/auth");
    }
  }, [customError, status, router]);

  return (
    <main className={styles.main}>
      <AuthMenu />

      <Toaster position="bottom-center" />
    </main>
  );
}

export default AuthPage;
