import React, { useState, useCallback, useEffect, useMemo } from "react";
import CheckBoxInput from "../checkBoxInput";
import styles from "../styles.module.scss";
import { useDebounce } from "@/hook/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { setLandmarks } from "@/store/landmarkSlice";
import { sortLandmarksByCategoryId } from "@/utils/sortByCategoryId";
import { RootState } from "@/store";
import { ILandmark } from "@/interfaces/landmark";
import { setCategoryFilter } from "@/store/filtersSlice";

interface Props {
  setIsActive: () => void;
  data: {
    selectedRegion: string;
    categories: {
      id: string;
      name: string;
    }[];
  };
}

const FiltersMenu: React.FC<Props> = React.memo((props) => {
  const { data, setIsActive } = props;
  const [checkedItems, setCheckedItems] = useState<string[]>(
    data.categories.map((cat) => cat.id)
  );

  const dispatch = useDispatch();
  const [isFirstRender, setIsFirstRender] = useState(true);

  // const selectedRegion = useSelector((state: RootState) => {
  //   return state.hexMap.selectedRegion;
  // });
  // const landmarks = useSelector((state: RootState) => state.landmarks);
  // const [allLandmarks, setAllLandmarks] = useState<ILandmark[]>(landmarks);

  // useEffect(() => {
  //   setAllLandmarks(landmarks);
  // }, [isFirstRender, selectedRegion]);

  const handleCheckBoxChange = useCallback((id: string) => {
    setCheckedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      dispatch(setCategoryFilter(checkedItems));
    }
  }, [checkedItems]);

  // const debounceCheckedItems = useDebounce(checkedItems, 1000);
  // useEffect(() => {
  //   if (isFirstRender) {
  //     setIsFirstRender(false);
  //   } else {
  //     dispatch(
  //       setLandmarks(
  //         sortLandmarksByCategoryId(allLandmarks, debounceCheckedItems)
  //       )
  //     );
  //   }
  // }, [debounceCheckedItems]);

  return (
    <div className={styles.filters_menu}>
      <div className={styles.filters_menu__select_region}>
        <h1 className={styles["select_region__text-main"]}>Выбранный регион</h1>

        <h2 className={styles["select_region__text-region"]}>
          {data.selectedRegion}
        </h2>
        <div className={styles.select_region__button_container}>
          <button
            type="button"
            style={{ "--button_text": `"Изменить"` } as React.CSSProperties}
            onClick={() => {
              setIsActive();
              window.scrollTo({ behavior: "smooth", top: 0 });
            }}
          >
            Изменить
          </button>
        </div>
      </div>

      <ul className={styles.filters_menu__select_categories}>
        {data.categories.map((cat) => {
          return (
            <CheckBoxInput
              checked={checkedItems.includes(cat.id)}
              onChange={() => handleCheckBoxChange(cat.id)}
              key={cat.id}
              item={cat}
            />
          );
        })}
      </ul>
    </div>
  );
});

export default FiltersMenu;
