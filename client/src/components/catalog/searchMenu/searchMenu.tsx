import styles from "../styles.module.scss";
import { useState } from "react";
import CheckBoxInput from "../checkBoxInput";
import FiltersButton from "../filtersButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSortVariableFilter } from "@/store/filtersSlice";

interface Props {
  data: {
    variables: {
      id: string;
      name: string;
      type: "asc" | "desc";
      group: "comment" | "rating";
    }[];
  };
}

function SearchMenu(props: Props) {
  const { data } = props;
  const [isSortActive, setIsSortActive] = useState(false);
  const varFilters = useSelector((state: RootState) => {
    return state.filters.sortVariable;
  });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    data.variables.filter(
      (variable) =>
        variable.type === varFilters.type && variable.group === varFilters.group
    )[0].id
  );
  const dispatch = useDispatch();

  const handleCheckBoxChange = (id: string) => {
    setSelectedItemId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.search_menu}>
      {/* <SearchInput /> */}

      <FiltersButton
        buttonClassName={styles.sort_container__sort_btn}
        activeButtonClassName={styles["sort_container__sort_btn-active"]}
        buttonText="Сортировка"
        isActive={isSortActive}
        setIsActive={() => setIsSortActive(!isSortActive)}
      />

      <ul className={styles.search_menu__sort_variables}>
        {data.variables.map((variable) => (
          <li
            key={variable.id}
            className={
              !isSortActive
                ? styles.sort_variables__variable
                : styles["sort_variables__variable-active"]
            }
          >
            <CheckBoxInput
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchMenu;
