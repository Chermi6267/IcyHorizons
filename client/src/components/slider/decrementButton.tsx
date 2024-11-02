import { SetStateAction } from "react";
import styles from "./styles.module.scss";
import Arrow from "../svg/arrow";

interface Props {
  onClick: () => void;
}

function DecrementButton(props: Props) {
  const { onClick } = props;

  return (
    <div className={styles.slider__button_container}>
      <button className={styles.button_container__dec_button} onClick={onClick}>
        <Arrow className={styles.dec_button__svg} />
      </button>
    </div>
  );
}

export default DecrementButton;
