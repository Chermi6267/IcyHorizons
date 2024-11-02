import Arrow from "../svg/arrow";
import styles from "./styles.module.scss";

interface Props {
  buttonText: string;
  buttonClassName: string;
  activeButtonClassName: string;
  isActive: boolean;
  setIsActive: () => void;
}

function FiltersButton(props: Props) {
  const {
    isActive,
    setIsActive,
    buttonText,
    buttonClassName,
    activeButtonClassName,
  } = props;

  return (
    <div className={styles.search_menu__sort_container}>
      <label className={styles.sort_container__sort_label} htmlFor="sort_arrow">
        {buttonText}
      </label>

      <button
        id="sort_arrow"
        onClick={() => setIsActive()}
        className={isActive ? activeButtonClassName : buttonClassName}
      >
        <Arrow className={styles.sort_btn__sort_arrow_svg} />
      </button>
    </div>
  );
}

export default FiltersButton;
