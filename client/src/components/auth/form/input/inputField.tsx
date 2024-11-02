import { UseFormRegisterReturn } from "react-hook-form";
import styles from "../../styles.module.scss";
import Eye from "@/components/svg/eye";

interface Props {
  name: "email" | "password1" | "password2";
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  onInput: () => void;
  showPassword?: boolean;
  setShowPassword?: () => void;
}

function InputField(props: Props) {
  const {
    name,
    type,
    register,
    placeholder,
    onInput,
    showPassword,
    setShowPassword,
  } = props;

  return (
    <div className={styles.input_container}>
      {name === "password1" &&
      showPassword !== undefined &&
      setShowPassword !== undefined ? (
        <div className={styles.input_container__password_field}>
          <input
            className={styles["input_container__input_field-password"]}
            {...register}
            type={showPassword ? "text" : "password"}
            name={name}
            placeholder={placeholder}
            onInput={onInput}
          />

          <button
            type="button"
            onClick={setShowPassword}
            className={styles.password_field__password_btn}
          >
            <Eye isOpen={showPassword} className={styles.password_btn__svg} />
          </button>
        </div>
      ) : (
        <input
          className={styles.input_container__input_field}
          {...register}
          type={type}
          name={name}
          placeholder={placeholder}
          onInput={onInput}
        />
      )}

      <div className={styles.input_container__underline} />
    </div>
  );
}

export default InputField;
