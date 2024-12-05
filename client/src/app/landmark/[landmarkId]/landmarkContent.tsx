"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchLandmark } from "@/queries/fetchLandmark";
import NameRating from "@/components/landmark/nameRating";
import Slider from "@/components/slider/slider";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { commentHandler } from "@/handlers/commentHandler";
import { ratingHandler } from "@/handlers/ratingHandler";
import useAuth from "@/hook/useAuth";
import Star from "@/components/svg/star";
import StarRating from "@/components/landmark/starRating";
import { Toaster } from "react-hot-toast";
import Image from "next/image";

interface Props {
  setNeedRefetch: (v: boolean) => void;
}

function LandmarkContent(props: Props) {
  const setNeedRefetch = props.setNeedRefetch;
  const { landmarkId } = useParams();
  const [commentText, setCommentText] = useState("");
  const { isAuth } = useAuth();
  const commentRef = useRef<HTMLDivElement>(null);
  const [rating, setRating] = useState([1, 1, 1, 1, 1]);

  const {
    data: landmarkData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["landmarkData"],
    queryFn: () => fetchLandmark(landmarkId.toString()),
    enabled: !!landmarkId,
  });

  return (
    <>
      {!isLoading && !isError && landmarkData ? (
        <>
          <Toaster position="bottom-center" />

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
                onKeyDown={(e) =>
                  commentHandler(
                    e,
                    false,
                    commentText,
                    rating,
                    landmarkId,
                    refetch,
                    setNeedRefetch,
                    setCommentText,
                    commentRef,
                    isAuth
                  )
                }
                className={styles.comment_input__input_field}
                contentEditable
                onInput={(e) => {
                  setCommentText(e.currentTarget.innerText);
                }}
                ref={commentRef}
              />

              <div className={styles.comment_input__underline} />
              <StarRating
                rating={rating}
                ratingHandler={(n: number) =>
                  ratingHandler(rating, setRating, n)
                }
              />

              <button
                onClick={(e) => {
                  commentHandler(
                    e,
                    true,
                    commentText,
                    rating,
                    landmarkId,
                    refetch,
                    setNeedRefetch,
                    setCommentText,
                    commentRef,
                    isAuth
                  );
                }}
                className={styles.comment_input__submit_btn}
              >
                Отправить
              </button>
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
                          <div className={styles.name_rating_cont__user}>
                            <Image
                              src={
                                comment.user.profile.avatar === null ||
                                comment.user.profile.avatar === ""
                                  ? "/userAvatar.png"
                                  : comment.user.profile.avatar
                              }
                              alt="User Avatar"
                              width={40}
                              height={40}
                              className={styles.user__avatar}
                            />
                            <h1 className={styles.user__name}>
                              {comment.user.profile.name}
                            </h1>
                          </div>
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
                <p className={styles.no_comments}>Отзывов пока что нет</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>{isError ? "Произошла ошибка" : "Подождите"}</p>
      )}
    </>
  );
}

export default LandmarkContent;
