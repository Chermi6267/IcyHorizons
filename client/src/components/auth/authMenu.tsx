"use client";

import RegistrationForm from "./form/registrationForm";
import LoginForm from "./form/loginForm";
import styles from "./styles.module.scss";
import { useState } from "react";
import Overlay from "./overlay/overlay";

interface Props {}

function AuthMenu(props: Props) {
  const {} = props;
  const [isRegForm, setIsRegForm] = useState(false);

  return (
    <div className={styles[`auth_container`]}>
      <div
        className={`${styles[`auth_container__form_container-reg`]} ${
          isRegForm ? styles[`reg-active`] : ""
        }`}
      >
        <RegistrationForm />
      </div>

      <div
        className={`${styles[`auth_container__form_container-log`]} ${
          isRegForm ? styles[`reg-active`] : ""
        }`}
      >
        <LoginForm />
      </div>

      <Overlay
        isRegForm={isRegForm}
        setIsRegForm={(value: boolean) => setIsRegForm(value)}
      />

      <button
        className={`${styles[`auth_container__switch_btn-reg`]} ${
          isRegForm ? styles[`reg-active`] : ""
        }`}
        onClick={() => setIsRegForm(true)}
      >
        Регистрация
      </button>

      <button
        className={`${styles[`auth_container__switch_btn-log`]} ${
          isRegForm ? styles[`reg-active`] : ""
        }`}
        onClick={() => setIsRegForm(false)}
      >
        Вход
      </button>
    </div>
  );
}

export default AuthMenu;
