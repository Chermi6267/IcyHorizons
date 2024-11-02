import styles from "../styles.module.scss";

interface Props {
  errors: any;
  successMessage: string;
}

function FormMessages(props: Props) {
  const { errors, successMessage } = props;

  return (
    <>
      {successMessage !== "" ? (
        <div className={styles["form__success_message_container"]}>
          <p>{successMessage}</p>
        </div>
      ) : null}

      {errors &&
      (errors.email || errors.password1 || errors.password2 || errors.root) ? (
        <div className={styles["form__error_message_container"]}>
          {errors.email ? <p>{errors.email?.message}</p> : null}
          {errors.password1 ? <p>{errors.password1?.message}</p> : null}
          {errors.password2 ? <p>{errors.password2?.message}</p> : null}
          {errors.root ? <p>{errors.root?.message}</p> : null}
        </div>
      ) : null}
    </>
  );
}

export default FormMessages;
