import styles from "../styles.module.scss";

interface Props {
  isRegForm: boolean;
  setIsRegForm: (value: boolean) => void;
}

function Overlay(props: Props) {
  const { isRegForm, setIsRegForm } = props;

  return (
    <div
      className={`${styles[`auth_container__overlay_container`]} ${
        isRegForm ? styles[`reg-active`] : ""
      }`}
    >
      <div
        className={`${styles[`overlay_container__overlay`]} ${
          isRegForm ? styles[`reg-active`] : ""
        }`}
      >
        <div
          className={`${styles[`overlay__greetings_container-log`]} ${
            isRegForm ? styles[`reg-active`] : ""
          }`}
        >
          <div className={styles.greetings_container__text_container}>
            <h1>Давно не виделись, Дружище!</h1>
            <p>Возвращайся, нажав здесь</p>
          </div>

          <button
            onClick={() => setIsRegForm(true)}
            className={styles.greetings_container__btn}
          >
            Вход
          </button>
        </div>

        <div
          className={`${styles[`overlay__greetings_container-reg`]} ${
            isRegForm ? styles[`reg-active`] : ""
          }`}
        >
          <div className={styles.greetings_container__text_container}>
            <h1>Привет, друг!</h1>
            <p>Зарегистрируйся, нажав здесь</p>
          </div>

          <button
            onClick={() => setIsRegForm(false)}
            className={styles.greetings_container__btn}
          >
            Регистрация
          </button>
        </div>
      </div>
    </div>
  );
}

export default Overlay;
