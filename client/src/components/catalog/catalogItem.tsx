import { useEffect, useRef, useState } from "react";
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
  const itemRef = useRef<HTMLHRElement>(null);
  const [userAttention, setUserAttention] = useState(true);

  useEffect(() => {
    if (itemRef && itemRef.current) {
      itemRef.current.style.color = "#9c9ff1";

      setTimeout(() => {
        if (itemRef && itemRef.current) {
          itemRef.current.style.color = "#ffffff";
        }
      }, 500);
    }
  }, [userAttention]);

  return (
    <li className={styles.catalog_item}>
      <div className={styles.catalog_item__name_rating_cont}>
        <h1
          ref={itemRef}
          className={styles.name_rating_cont__name}
          onClick={() => {
            router.push(`/landmark/${item.id}`);
          }}
        >
          {item.name}
        </h1>
        <div className={styles.name_rating_cont__rating}>
          <p className={styles.rating__text}>
            {String(parseFloat(item.rating).toFixed(1)).split(".")[1] === "0"
              ? parseFloat(item.rating).toFixed(0)
              : parseFloat(item.rating).toFixed(1)}
          </p>

          <Star className={styles.rating__svg} />
        </div>
      </div>
      <div className={styles.catalog_item__photo_description_cont}>
        <Slider
          images={item.landmarkPhoto}
          className={styles.photo_description_cont__slider}
        />

        <h2
          className={styles.photo_description_cont__text}
          onClick={() => {
            setUserAttention(!userAttention);
          }}
        >
          {item.description}
        </h2>
      </div>
    </li>
  );
}

export default CatalogItem;
