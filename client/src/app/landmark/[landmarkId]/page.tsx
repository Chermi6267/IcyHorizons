"use client";

import { useParams } from "next/navigation";
import styles from "./styles.module.scss";
import Header from "@/components/header/header";
import { useQuery } from "@tanstack/react-query";
import { fetchLandmark } from "@/queries/fetchLandmark";
import NameRating from "@/components/landmark/nameRating";
import Slider from "@/components/slider/slider";
import { useRef, useState } from "react";
import Star from "@/components/svg/star";
import Arrow from "@/components/svg/arrow";
import api from "@/http/api";
import useAuth from "@/hook/useAuth";
import Link from "next/link";
import AuthHandler from "@/components/auth/authHandler";

interface Props {}

function LandmarkPage(props: Props) {
  const { landmarkId } = useParams();
  const [commentText, setCommentText] = useState("");
  const { isAuth } = useAuth();
  const commentRef = useRef<HTMLDivElement>(null);

  const {
    data: landmarkData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["landmarkData"],
    queryFn: () => fetchLandmark(landmarkId.toString()),
    enabled: !!landmarkId,
    gcTime: 0,
    staleTime: 0,
  });

  return (
    <>
      <AuthHandler />

      <Header />

      <main className={styles.main}>
        <Link
          href={"/?shouldUpdateFilterCategories=1"}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className={styles.back_arrow}>
            <Arrow className={styles.back_arrow__svg} />
            <p className={styles.back_arrow__text}>Назад</p>
          </div>
        </Link>

        {!isLoading && !isError && landmarkData ? (
          <>
            <div className={styles.landmark_main}>
              <div className={styles.landmark_main__text_cont}>
                <p>{landmarkData.description}</p>
              </div>

              <Slider
                className={styles.landmark_main__slider}
                images={landmarkData.landmarkPhoto}
              />
            </div>

            <NameRating landmarkData={landmarkData} />

            <div className={styles.landmark_main__comment_cont}>
              <div className={styles.comment_cont__comment_input}>
                <div
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 && !e.shiftKey) {
                      e.preventDefault();
                      if (isAuth) {
                        let a = prompt(
                          "Насколько вы оцените достопримечательность от 1 до 5. (По умолчанию - 5)"
                        );

                        if (a === null || Number.isNaN(parseInt(a))) {
                          a = "5";
                        }

                        a = parseInt(a) > 5 ? "5" : a;
                        a = parseInt(a) < 1 ? "1" : a;

                        api
                          .post("/comment/create", {
                            text: commentText,
                            stars: a,
                            landmarkId: landmarkData.id,
                          })
                          .then((res) => {
                            refetch();
                          })
                          .catch((error) => {
                            console.error(error);
                          });

                        setCommentText("");
                        if (commentRef !== null && commentRef.current) {
                          commentRef.current.innerText = "";
                        }
                      } else {
                        alert("Вы не авторизованы");
                      }
                    }
                  }}
                  className={styles.comment_input__input_field}
                  contentEditable
                  onInput={(e) => {
                    setCommentText(e.currentTarget.innerText);
                  }}
                  ref={commentRef}
                />

                <div className={styles.comment_input__underline} />
              </div>

              <div className={styles.comment_cont__comments}>
                {landmarkData.comment.length > 0 ? (
                  landmarkData.comment
                    .slice()
                    .reverse()
                    .map((comment) => {
                      return (
                        <div key={comment.id} className={styles.comment}>
                          <div className={styles.comment__name_rating_cont}>
                            <h1 className={styles.name_rating_cont__name}>
                              {comment.user.email}
                            </h1>
                            <div className={styles.name_rating_cont__rating}>
                              <p className={styles.rating__text}>
                                {comment.stars}
                              </p>

                              <Star className={styles.rating__svg} />
                            </div>
                          </div>

                          <p className={styles.comment__text}>{comment.text}</p>
                        </div>
                      );
                    })
                ) : (
                  <p>Отзывов пока что нет</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>{isError ? "Произошла ошибка" : isLoading ? "Подождите" : null}</p>
        )}
      </main>
    </>
  );
}

export default LandmarkPage;
