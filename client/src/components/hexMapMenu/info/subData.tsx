import { ILandmarksByAdminCenter } from "@/interfaces/landmark";
import styles from "../styles.module.scss";

interface Props {
  data: ILandmarksByAdminCenter | undefined;
  isLoading: boolean;
}

function InfoSubData(props: Props) {
  const { data, isLoading } = props;

  return (
    <>
      {isLoading ? (
        <div className={styles.preloader}>
          <div className={styles.preloader__cell} />
        </div>
      ) : !data?.adminCenter ? null : (
        <>
          <p>Центр: {data?.adminCenter.capital}</p>
          <p>Площадь: {parseFloat(data?.adminCenter.area)} км²</p>
        </>
      )}
    </>
  );
}

export default InfoSubData;
