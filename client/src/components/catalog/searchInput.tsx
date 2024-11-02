import styles from "./styles.module.scss";

interface Props {}

function SearchInput(props: Props) {
  const {} = props;

  return (
    <div className={styles.search_menu__input_container}>
      <input
        className={styles.input_container__input_field}
        type="text"
        onClick={() => alert("Функция находиться в разработке")}
        readOnly
        placeholder="Поиск"
      />

      <div className={styles.input_container__underline} />
    </div>
  );
}

export default SearchInput;
