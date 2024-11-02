import styles from "../styles.module.scss";

interface Props {
  regionName: string | undefined;
  isLoading: boolean;
  isError: boolean;
}

function SlimData(props: Props) {
  const { regionName, isLoading, isError } = props;

  return isLoading ? (
    <div className={styles.preloader}>
      <div className={styles.preloader__cell} />
    </div>
  ) : isError ? (
    <p className={styles.info_text}>Что-то пошло не так!</p>
  ) : (
    <h1 className={styles.slim_data__text}>{regionName}</h1>
  );
}

export default SlimData;
