import Slider from "../../slider/slider";
import Star from "../../svg/star";
import styles from "../styles.module.scss";
import { ILandmarksByAdminCenter } from "@/interfaces/landmark";

interface Props {
  data: ILandmarksByAdminCenter | undefined;
  isLoading: boolean;
  isError: boolean;
}

function InfoMainData(props: Props) {
  const { data, isLoading, isError } = props;

  const content = isLoading ? (
    <div className={styles.preloader}>
      <div className={styles.preloader__cell} />
      <div className={styles.preloader__cell} />
      <div className={styles.preloader__cell} />
    </div>
  ) : isError ? (
    <p className={styles.info_text}>Что-то пошло не так!</p>
  ) : !data?.adminCenter ? null : (
    <>
      <h1 className={styles.main_data__title}>{data.adminCenter.name}</h1>
      {data.landmarks.length > 0 ? (
        <>
          <h2 className={styles.main_data__sub_title}>Лучшее для вас</h2>
          <div className={styles.main_data__landmark_info}>
            <div className={styles.landmark_info__first_cell}>
              <Slider
                className={styles.first_cell__slider}
                images={data.landmarks[0].landmarkPhoto}
              />
              <div className={styles.first_cell__right}>
                <h1>{data.landmarks[0].name}</h1>
                <div className={styles.right__rating}>
                  <Star className={styles.rating__star} />
                  <p>
                    {String(
                      parseFloat(data.landmarks[0].rating).toFixed(1)
                    ).split(".")[1] === "0"
                      ? parseFloat(data.landmarks[0].rating).toFixed(0)
                      : parseFloat(data.landmarks[0].rating).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
            <p className={styles.landmark_info__description}>
              {data.landmarks[0].description}
            </p>
          </div>
        </>
      ) : (
        <p className={styles.info_text}>
          Здесь пока что пусто, но наша команда спешит это исправить
        </p>
      )}
    </>
  );

  return content;
}

export default InfoMainData;
