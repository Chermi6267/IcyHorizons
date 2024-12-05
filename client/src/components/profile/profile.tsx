"use client";

import {
  IUser,
  setNewAvatar,
  setNewHeader,
  setNewName,
  unsetUser,
} from "@/store/userSlice";
import styles from "./styles.module.scss";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { logoutHandler } from "@/handlers/logoutHandler";
import api from "@/http/api";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  user: IUser;
}

function Profile(props: Props) {
  const { user } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const nameRef = useRef<HTMLDivElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const headerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameRef && nameRef.current) {
      nameRef.current.innerHTML = user.name === null ? "Ваше имя" : user.name;
    }
  }, []);

  const changeNameHandler = () => {
    if (nameRef && nameRef.current) {
      if (nameRef.current.innerHTML !== user.name) {
        api
          .put("/user/name", { name: nameRef.current.innerHTML })
          .then((res) => {
            toast.success("Имя пользователя изменено", {
              style: {
                backgroundColor: "rgba(65, 67, 112, 0.25)",
                outline: "2px solid rgba(65, 67, 112, 1)",
                color: "white",
                backdropFilter: "blur(2px)",
              },

              iconTheme: {
                primary: "#a8cd9f",
                secondary: "white",
              },
            });
            localStorage.setItem("token", res.data.accessToken);
            dispatch(setNewName({ name: `${res.data.newName}` }));
            dispatch(logIn(res.data.accessToken));
          })
          .catch((error) => {
            if (nameRef && nameRef.current) {
              nameRef.current.innerHTML = user.name || "";
            }
            toast.error(error.response.data.message, {
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
          });
      }
    }
  };

  const changeAvatarHandler = () => {
    if (
      avatarInputRef &&
      avatarInputRef.current &&
      avatarInputRef.current.files
    ) {
      const file = avatarInputRef.current.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        api
          .put("/user/avatar", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            toast.success("Фото профиля изменено", {
              style: {
                backgroundColor: "rgba(65, 67, 112, 0.25)",
                outline: "2px solid rgba(65, 67, 112, 1)",
                color: "white",
                backdropFilter: "blur(2px)",
              },

              iconTheme: {
                primary: "#a8cd9f",
                secondary: "white",
              },
            });
            localStorage.setItem("token", res.data.accessToken);
            dispatch(setNewAvatar({ avatar: res.data.avatar }));
            dispatch(logIn(res.data.accessToken));

            avatarInputRef.current!.value = "";
          })
          .catch((error) => {
            toast.error("Не смогли обновить фото профиля. Попробуйте позже", {
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
          });
      }
    }
  };

  const changeHeaderHandler = () => {
    if (
      headerInputRef &&
      headerInputRef.current &&
      headerInputRef.current.files
    ) {
      const file = headerInputRef.current.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        api
          .put("/user/header", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            toast.success("Шапка профиля изменена", {
              style: {
                backgroundColor: "rgba(65, 67, 112, 0.25)",
                outline: "2px solid rgba(65, 67, 112, 1)",
                color: "white",
                backdropFilter: "blur(2px)",
              },

              iconTheme: {
                primary: "#a8cd9f",
                secondary: "white",
              },
            });
            localStorage.setItem("token", res.data.accessToken);
            dispatch(setNewHeader({ header: res.data.header }));
            dispatch(logIn(res.data.accessToken));

            headerInputRef.current!.value = "";
          })
          .catch((error) => {
            toast.error("Не смогли обновить шапку профиля. Попробуйте позже", {
              style: {
                backgroundColor: "rgba(65, 67, 112, 0.25)",
                outline: "2px solid rgba(65, 67, 112, 1)",
                color: "white",
                backdropFilter: "blur(2px)",
              },

              iconTheme: {
                primary: "#eb4335",
                secondary: "white",
              },
            });
            console.error(error);
          });
      }
    }
  };

  return (
    <>
      <div className={styles.profile}>
        <div
          className={styles.profile__header_avatar}
          style={
            {
              backgroundImage: `url(${
                user.header === "" ? "/userHeader.png" : user.header
              })`,
              "--avatar-url": `url(${
                user.avatar === "" ? "/userAvatar.png" : user.avatar
              })`,
            } as React.CSSProperties
          }
        >
          <div
            onClick={() => {
              if (headerInputRef && headerInputRef.current) {
                headerInputRef.current.click();
              }
            }}
            className={styles.profile__header_input}
          />
          <input
            ref={headerInputRef}
            type="file"
            name="header"
            id="header"
            hidden
            onChange={changeHeaderHandler}
          />
          <div
            onClick={() => {
              if (avatarInputRef && avatarInputRef.current) {
                avatarInputRef.current.click();
              }
            }}
            className={styles.profile__avatar_input}
          />
          <input
            ref={avatarInputRef}
            type="file"
            name="avatar"
            id="avatar"
            hidden
            onChange={changeAvatarHandler}
          />
        </div>

        <div className={styles.profile__name_cont}>
          <div
            onBlur={() => {
              changeNameHandler();
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                e.preventDefault();
                if (nameRef && nameRef.current) {
                  nameRef.current.blur();
                }
              }
            }}
            ref={nameRef}
            className={styles.profile__name}
            contentEditable
            spellCheck="false"
            id="nameInput1"
          />
          <label
            htmlFor="nameInput1"
            onClick={() => {
              if (nameRef && nameRef.current) {
                nameRef.current.focus();
              }
            }}
          >
            ✎
          </label>
        </div>

        <p spellCheck="false" className={styles.profile__email}>
          {user.email === "" ? "Ваше почта" : user.email}
        </p>

        <button
          className={styles.profile__logout_btn}
          onClick={() => {
            logoutHandler()
              .then((res) => {
                localStorage.removeItem("token");
                dispatch(unsetUser());
                dispatch(logOut());
                console.log("LOGOUT");
                router.push("/");
              })
              .catch((error) => {});
          }}
        >
          ВЫЙТИ
        </button>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
}

export default Profile;
