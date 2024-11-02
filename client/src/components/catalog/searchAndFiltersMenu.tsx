import { useEffect, useRef, useState } from "react";
import CheckBoxInput from "./checkBoxInput";
import FiltersMenu from "./filterMenu/filtersMenu";
import FiltersButton from "./filtersButton";
import styles from "./styles.module.scss";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setSortVariableFilter } from "@/store/filtersSlice";

interface Props {
  data1: {
    variables: {
      id: string;
      name: string;
      type: "asc" | "desc";
      group: "comment" | "rating";
    }[];
  };

  data2: {
    selectedRegion: string;
    categories: {
      id: string;
      name: string;
    }[];
  };
}

function SearchAndFiltersMenu(props: Props) {
  const { data1, data2 } = props;
  const [isFilterActive, setIsFiltersActive] = useState(false);
  const varFilters = useSelector((state: RootState) => {
    return state.filters.sortVariable;
  });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    data1.variables.filter(
      (variable) =>
        variable.type === varFilters.type && variable.group === varFilters.group
    )[0].id
  );
  const searchInputRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const mainContainer = document.querySelector("main");
    if (mainContainer) {
      mainContainer.style.overflow = isFilterActive ? "hidden" : "auto";
      mainContainer.style.maxHeight = isFilterActive ? "85vh" : "100%";
    }

    return () => {
      if (mainContainer) {
        mainContainer.style.overflow = "auto";
        mainContainer.style.maxHeight = "100%";
      }
    };
  }, [isFilterActive]);

  const handleCheckBoxChange = (id: string) => {
    setSelectedItemId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <div className={styles.search_menu} ref={searchInputRef}>
        {/* <SearchInput /> */}

        <FiltersButton
          buttonClassName={styles.sort_container__sort_filters_btn}
          activeButtonClassName={
            styles["sort_container__sort_filters_btn-active"]
          }
          buttonText="Фильтры"
          isActive={isFilterActive}
          setIsActive={() => setIsFiltersActive(!isFilterActive)}
        />
      </div>

      <div
        className={
          isFilterActive
            ? styles["filters_menu-full_width-active"]
            : styles["filters_menu-full_width"]
        }
      >
        <FiltersMenu
          data={data2}
          setIsActive={() => setIsFiltersActive(!isFilterActive)}
        />

        <div className={styles.search_menu__sort_variables_container}>
          <h1>Сортировка</h1>
          <ul className={styles.sort_variables_container__sort_variables}>
            {data1.variables.map((variable) => {
              return (
                <CheckBoxInput
                  key={variable.id}
                  checked={selectedItemId === variable.id}
                  onChange={() => {
                    handleCheckBoxChange(variable.id);
                    dispatch(
                      setSortVariableFilter({
                        group: variable.group,
                        type: variable.type,
                      })
                    );
                  }}
                  item={variable}
                />
              );
            })}
          </ul>
        </div>

        <div
          style={{ width: "90%" }}
          className={styles["select_region__button_container"]}
        >
          <button
            style={{ "--button_text": `"Применить"` } as React.CSSProperties}
            onClick={() => {
              setIsFiltersActive(false);
              setTimeout(() => {
                if (searchInputRef && searchInputRef.current && window) {
                  window.scroll({
                    left: 0,
                    top: searchInputRef.current.offsetTop - 15,
                    behavior: "smooth",
                  });
                }
              }, 0);
            }}
          >
            Применить
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchAndFiltersMenu;
