import { useSelector } from "react-redux";
import CatalogItem from "./catalogItem";
import styles from "./styles.module.scss";
import { RootState } from "@/store";
import { ILandmark } from "@/interfaces/landmark";
import { sortByRating } from "@/utils/sortByRating";
import { sortByCommentsLength } from "@/utils/sortByCommentsLength";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
  initialData: ILandmark[];
}

function CatalogItems(props: Props) {
  const { initialData } = props;
  const selectedRegion = useSelector(
    (state: RootState) => state.hexMap.selectedRegion
  );
  const filters = useSelector((state: RootState) => {
    return state.filters;
  });
  const data = useSelector((state: RootState) => {
    return state.landmarks;
  });
  const searchParams = useSearchParams();
  const needRefetch = searchParams.get("needRefetch");

  return (
    <ul className={styles.catalog_items}>
      {data.length === 0 ? (
        <li>
          <p style={{ width: "90%", margin: "0 auto", textAlign: "center" }}>
            Ничего не нашли.<br></br>Попробуйте изменить фильтры или выберите
            другой регион
          </p>
        </li>
      ) : (
        <>
          {selectedRegion === "ALL" &&
          filters.categories.length >= 4 &&
          needRefetch !== "true"
            ? filters.sortVariable.group === "rating"
              ? sortByRating(initialData, filters.sortVariable.type).map(
                  (item) => {
                    return <CatalogItem key={item.id} item={item} />;
                  }
                )
              : sortByCommentsLength(
                  initialData,
                  filters.sortVariable.type
                ).map((item) => {
                  return <CatalogItem key={item.id} item={item} />;
                })
            : data.map((item) => {
                return <CatalogItem key={item.id} item={item} />;
              })}
        </>
      )}
    </ul>
  );
}

export default CatalogItems;
