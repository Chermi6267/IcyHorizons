import { signIn } from "next-auth/react";
import YandexSvg from "@/components/svg/yandex";
import styles from "./../styles.module.scss";

interface Props {}

function YandexButton(props: Props) {
  const {} = props;

  return (
    <button
      onClick={() => {
        signIn("yandex");
      }}
      className={styles.log_with_container__btn}
      type="button"
    >
      <YandexSvg className={styles["btn__svg-yandex"]} />
    </button>
  );
}

export default YandexButton;
