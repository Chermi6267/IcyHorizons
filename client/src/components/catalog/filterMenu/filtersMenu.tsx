import React, { useState, useCallback, useEffect } from "react";
import CheckBoxInput from "../checkBoxInput";
import styles from "../styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter } from "@/store/filtersSlice";
import { useSearchParams } from "next/navigation";
import { RootState } from "@/store";

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
  const cats = useSelector((state: RootState) => {
    return state.filters.categories;
  });
  const [checkedItems, setCheckedItems] = useState<string[]>(
    cats.length === data.categories.length
      ? data.categories.map((cat) => cat.id)
      : cats
  );

  const dispatch = useDispatch();
  const [isFirstRender, setIsFirstRender] = useState(true);

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
    if (!isFirstRender) {
      dispatch(setCategoryFilter(checkedItems));
    } else {
      setIsFirstRender(false);
    }
  }, [checkedItems]);

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

FiltersMenu.displayName = "FiltersMenu";

export default FiltersMenu;
