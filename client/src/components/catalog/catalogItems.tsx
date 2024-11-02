import { useSelector } from "react-redux";
import CatalogItem from "./catalogItem";
import styles from "./styles.module.scss";
import { RootState } from "@/store";
import { ILandmark } from "@/interfaces/landmark";

interface Props {
  initialData: ILandmark[];
}

function CatalogItems(props: Props) {
  const { initialData } = props;
  const selectedRegion = useSelector(
    (state: RootState) => state.hexMap.selectedRegion
  );
  const data = useSelector((state: RootState) => {
    return state.landmarks;
  });

  return (
    <ul className={styles.catalog_items}>
      {data.length === 0 ? (
        <li>
          <p>Здесь пока что пусто, но наша команда спешит это исправить</p>
        </li>
      ) : (
        <>
          {data.map((item) => {
            return <CatalogItem key={item.id} item={item} />;
          })}
        </>
      )}
    </ul>
  );
}

export default CatalogItems;
