import Slider from "../slider/slider";
import Star from "../svg/star";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

interface Props {
  item: {
    id: number;
    name: string;
    description: string;
    rating: string;
    category: {
      id: string;
      name: string;
    }[];
    landmarkPhoto: {
      id: number;
      photoPath: string;
      landmarkId: number;
    }[];
  };
}

function CatalogItem(props: Props) {
  const { item } = props;
  const router = useRouter();

  return (
    <li
      className={styles.catalog_item}
      onClick={() => {
        router.push(`/landmark/${item.id}`);
      }}
    >
      <div className={styles.catalog_item__name_rating_cont}>
        <h1 className={styles.name_rating_cont__name}>{item.name}</h1>
        <div className={styles.name_rating_cont__rating}>
          <p className={styles.rating__text}>
            {Math.round(parseFloat(item.rating))}
          </p>

          <Star className={styles.rating__svg} />
        </div>
      </div>
      <div className={styles.catalog_item__photo_description_cont}>
        <Slider
          images={item.landmarkPhoto}
          className={styles.photo_description_cont__slider}
        />

        <h2 className={styles.photo_description_cont__text}>
          {item.description}
        </h2>
      </div>
    </li>
  );
}

export default CatalogItem;
