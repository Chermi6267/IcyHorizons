import InputField from "./input/inputField";
import SubmitButton from "./submitButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { logIn } from "@/store/authSlice";
import { loginHandler } from "@/handlers/loginHandler";
import { ILogForm } from "@/interfaces/login";
import { useState } from "react";
import styles from "../styles.module.scss";
import LogWith from "./logWith/logWith";
import FormMessages from "./formMessages";
import { useRouter } from "next/navigation";

interface Props {}

function LoginForm(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<ILogForm>({ mode: "onSubmit" });

  const onSubmit: SubmitHandler<ILogForm> = async (data) => {
    setIsLoading(true);
    await loginHandler({
      data: {
        email: data.email,
        password1: data.password1,
        loggedWith: "credentials",
      },
    })
      .then((res) => {
        if (res && res !== "") {
          console.log("LOGGED IN");
          localStorage.setItem("token", res);
          dispatch(logIn(res));
          setSuccessMessage("Успех");
          router.push("/");
        }
      })
      .catch((error) => {
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
      <h1 className={styles.form__text}>Вход</h1>

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

      <FormMessages successMessage={successMessage} errors={errors} />

      <SubmitButton text={!isLoading ? "Войти" : "Обработка..."} />

      <LogWith />
    </form>
  );
}

export default LoginForm;
