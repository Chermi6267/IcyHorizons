"use client";

import InputField from "./input/inputField";
import SubmitButton from "./submitButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { IRegForm } from "@/interfaces/registration";
import { regHandler } from "@/handlers/registrationHandler";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { logIn } from "@/store/authSlice";
import styles from "../styles.module.scss";
import LogWith from "./logWith/logWith";
import { useState } from "react";
import FormMessages from "./formMessages";
import { useRouter } from "next/navigation";

interface Props {}

function RegistrationForm(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<IRegForm>({ mode: "onSubmit" });

  const onSubmit: SubmitHandler<IRegForm> = async (data) => {
    setIsLoading(true);
    await regHandler({
      data: {
        email: data.email,
        password: data.password1,
        loggedWith: "credentials",
      },
    })
      .then((res) => {
        if (res && res !== "") {
          console.log("REG SUCCESS");
          localStorage.setItem("token", res);
          dispatch(logIn(res));
          setSuccessMessage("Успех");
          router.push("/");
        }
      })
      .catch((error) => {
        setSuccessMessage("");
        setError("root", {
          type: "custom",
          message: `${(error as Error).message}`,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });

    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.form__text}>Регистрация</h1>

      <InputField
        register={register("email", {
          required: "Поле почты обязательно к заполнению.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Неверный формат почты.",
          },
        })}
        name="email"
        type="text"
        placeholder="почта"
        onInput={() => clearErrors("email")}
      />

      <InputField
        register={register("password1", {
          required: "Пароль не должен быть пустым.",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            message:
              "Пароль должен содержать сточные, заглавные буквы а также цифры.",
          },
        })}
        name="password1"
        type="password"
        placeholder="пароль"
        showPassword={showPassword}
        setShowPassword={() => setShowPassword(!showPassword)}
        onInput={() => clearErrors("password1")}
      />

      <InputField
        register={register("password2", {
          validate: (password2) => {
            if (watch("password1") !== password2) {
              return "Пароли не совпадают.";
            }

            return true;
          },
        })}
        name="password2"
        type="password"
        placeholder="повторите пароль"
        onInput={() => clearErrors("password2")}
      />

      <FormMessages successMessage={successMessage} errors={errors} />

      <SubmitButton text={!isLoading ? "Зарегистрироваться" : "Обработка..."} />

      <LogWith />
    </form>
  );
}

export default RegistrationForm;
