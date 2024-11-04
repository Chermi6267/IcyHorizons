import EmptyStar from "../svg/emptyStar";
import Star from "../svg/star";
import styles from "./styles.module.scss";

interface Props {
  rating: number[];
  ratingHandler: (n: number) => void;
}

function StarRating(props: Props) {
  const { rating, ratingHandler } = props;

  return (
    <div className={styles.comment_input__stars_cont}>
      <Star
        onClick={() => ratingHandler(1)}
        className={styles["rating__svg-empty"]}
      />

      {rating[1] ? (
        <Star
          onClick={() => ratingHandler(2)}
          className={styles["rating__svg-empty"]}
        />
      ) : (
        <EmptyStar
          onClick={() => ratingHandler(2)}
          className={styles["rating__svg-empty"]}
        />
      )}

      {rating[2] ? (
        <Star
          onClick={() => ratingHandler(3)}
          className={styles["rating__svg-empty"]}
        />
      ) : (
        <EmptyStar
          onClick={() => ratingHandler(3)}
          className={styles["rating__svg-empty"]}
        />
      )}

      {rating[3] ? (
        <Star
          onClick={() => ratingHandler(4)}
          className={styles["rating__svg-empty"]}
        />
      ) : (
        <EmptyStar
          onClick={() => ratingHandler(4)}
          className={styles["rating__svg-empty"]}
        />
      )}

      {rating[4] ? (
        <Star
          onClick={() => ratingHandler(5)}
          className={styles["rating__svg-empty"]}
        />
      ) : (
        <EmptyStar
          onClick={() => ratingHandler(5)}
          className={styles["rating__svg-empty"]}
        />
      )}
    </div>
  );
}

export default StarRating;
