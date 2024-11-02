import { ILandmark } from "@/interfaces/landmark";
import Star from "../svg/star";
import styles from "./styles.module.scss";

interface Props {
  landmarkData: ILandmark;
}

function NameRating(props: Props) {
  const { landmarkData } = props;
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={styles.landmark_name_rating}>
      <div className={styles.landmark_name_rating__name}>
        {landmarkData.name}
      </div>

      <div className={styles.landmark_name_rating__rating}>
        {stars.map((star, index) => {
          return Math.round(parseFloat(landmarkData.rating)) - 1 - index >=
            0 ? (
            <Star key={star} className={styles.rating__svg} />
          ) : (
            <Star key={star} className={styles["rating__svg-disabled"]} />
          );
        })}
        {Math.round(parseFloat(landmarkData.rating))}
      </div>
      <div className={styles.landmark_name_rating__rating}>
        Отзывов: {landmarkData.comment.length}
      </div>
    </div>
  );
}

export default NameRating;
