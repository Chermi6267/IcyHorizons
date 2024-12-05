"use client";

import Logo from "../svg/logo";
import styles from "./style.module.scss";
import { useState, useEffect } from "react";
import useAuth from "@/hook/useAuth";
import Image from "next/image";
import { logoutHandler } from "@/handlers/logoutHandler";
import { logOut } from "@/store/authSlice";
import { unsetUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import AuthHandler from "../auth/authHandler";

interface Props {}

function Header(props: Props) {
  const [isUserMenu, setIsUserMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const { isAuth, user } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 200);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const clientCondition = isAuth && isClient;

  return (
    <>
      <AuthHandler />
      <header
        className={`${styles.header} ${isVisible ? "" : styles.header_hidden}`}
      >
        <div
          className={styles.header__logo_container}
          onClick={() => {
            router.push("/");
          }}
        >
          <Logo className={styles.logo_container__svg} />
          <h1 className={styles.logo_container__text}>Icy Horizons</h1>
        </div>

        <div className={styles.header__buttons_container}>
          {/* <button
            onClick={() => {
              router.push("/about");
            }}
            className={styles.buttons_container__btn}
          >
            О нас
          </button> */}
          <div
            className={styles.buttons_container__user}
            onClick={() => {
              clientCondition ? router.push("/profile") : router.push("/auth");
            }}
          >
            <Image
              src={
                clientCondition
                  ? user.avatar === "" || user.avatar === null
                    ? "/userAvatar.png"
                    : user.avatar
                  : "/user.png"
              }
              alt="User"
              fill
              sizes="width: 100%; height: 100%"
              className={`${styles.user__img} ${
                clientCondition ? styles["user__img-auth"] : ""
              }`}
            />

            <button className={styles.user__show_btn} />

            <div
              className={
                isUserMenu
                  ? styles.user__info_wrapper
                  : styles["user__info_wrapper-hidden"]
              }
            >
              <div className={styles.info_wrapper__container}>
                <p className={styles.container__text}>
                  {clientCondition ? user.email : "Вы не авторизованы"}
                </p>
              </div>
            </div>

            <div
              className={
                isUserMenu
                  ? styles["user__info_wrapper-logout"]
                  : styles["user__info_wrapper-logout-hidden"]
              }
            >
              <div
                className={styles.info_wrapper__container}
                style={
                  !clientCondition ? { color: "#a8cd9f" } : { color: "#eb4335" }
                }
                onClick={() => {
                  if (clientCondition) {
                    logoutHandler();
                    dispatch(unsetUser());
                    dispatch(logOut());
                    localStorage.removeItem("token");
                  } else {
                    router.push("/auth");
                  }
                }}
              >
                <p className={styles.container__logout_text}>
                  {clientCondition ? "Выйти" : "Войти"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
