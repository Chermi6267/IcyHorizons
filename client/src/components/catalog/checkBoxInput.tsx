import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { v4 as uuidv4 } from "uuid";

interface Props {
  item: {
    id: string;
    name: string;
  };
  checked: boolean;
  onChange: () => void;
}

function CheckBoxInput(props: Props) {
  const { item, checked, onChange } = props;
  const [id, setId] = useState("");

  useEffect(() => {
    setId(uuidv4());
  }, []);

  return (
    <div className={styles.check_box}>
      <div
        onClick={onChange}
        className={
          checked
            ? styles["check_box__custom_box-active"]
            : styles.check_box__custom_box
        }
      ></div>

      <input
        type="checkbox"
        name={item.name}
        id={id}
        checked={checked}
        onChange={onChange}
      />

      <label htmlFor={id}>{item.name}</label>
    </div>
  );
}

export default CheckBoxInput;
