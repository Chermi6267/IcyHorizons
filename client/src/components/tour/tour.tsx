"use client";

import { useRouter } from "next/navigation";
import Slider from "../slider/slider";
import styles from "./styles.module.scss";

interface Props {}

function Tour(props: Props) {
  const {} = props;
  const router = useRouter();
  const tourData = [
    { id: 1, photoPath: "/SakhaSled/1.jpeg", landmarkId: 1 },
    { id: 2, photoPath: "/SakhaSled/2.jpeg", landmarkId: 2 },
    { id: 3, photoPath: "/SakhaSled/3.jpeg", landmarkId: 3 },
    { id: 4, photoPath: "/SakhaSled/4.jpeg", landmarkId: 4 },
  ];

  return (
    <div className={styles.tour}>
      <h1 className={styles.tour__title}>
        Авторские туры <span>SakhaSled</span> в Якутии
      </h1>

      <Slider className={styles.tour__slider} images={tourData} />

      <h3 className={styles.tour__desc}>
        Путешествия и экспедиции на снегоходах с компанией SakhaSled. Мото
        эндуро, 4x4 и квадроциклах. Эксклюзивная рыбалка
      </h3>

      <button
        onClick={() => {
          router.push("https://sakhasled.com/");
        }}
        className={styles.tour__btn}
      >
        Вперед
      </button>
    </div>
  );
}

export default Tour;
