import { toast } from "react-hot-toast";
import api from "@/http/api";

export const commentHandler = async (
  e: any,
  isBtn: boolean,
  commentText: string,
  rating: number[],
  landmarkId: string | string[],
  refetch: () => void,
  setNeedRefetch: (v: boolean) => void,
  setCommentText: React.Dispatch<React.SetStateAction<string>>,
  commentRef: React.RefObject<HTMLDivElement>,
  isAuth: boolean
) => {
  if ((e.key === "Enter" && !e.shiftKey && window.innerWidth > 768) || isBtn) {
    e.preventDefault();

    if (isAuth) {
      if (commentText === "") {
        toast("Заполните поле отзыва", {
          id: "1",
          style: {
            backgroundColor: "rgba(65, 67, 112, 0.25)",
            outline: "2px solid rgba(65, 67, 112, 1)",
            color: "white",
            backdropFilter: "blur(5px)",
          },
          iconTheme: {
            primary: "#ffc500",
            secondary: "white",
          },
        });
        return;
      }

      try {
        await api.post("/comment/create", {
          text: commentText,
          stars: rating.reduce((acc, num) => acc + num, 0),
          landmarkId: landmarkId,
        });

        toast.success("Отзыв оставлен", {
          id: "1",
          style: {
            backgroundColor: "rgba(65, 67, 112, 0.25)",
            outline: "2px solid rgba(65, 67, 112, 1)",
            color: "white",
            backdropFilter: "blur(5px)",
          },
          iconTheme: {
            primary: "#a8cd9f",
            secondary: "white",
          },
        });

        refetch();
        setNeedRefetch(true);
        await fetch("/landmark", { method: "POST" });
      } catch (error) {
        toast.error("Что-то пошло не так", {
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
        });
        console.error(error);
      }

      setCommentText("");
      if (commentRef.current) {
        commentRef.current.innerText = "";
      }
    } else {
      toast.error("Вы не авторизованы", {
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
      });
    }
  }
};
