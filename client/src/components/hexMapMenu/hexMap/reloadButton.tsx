import Reload from "../../svg/reload";
import styles from "../styles.module.scss";
import { motion } from "framer-motion";
import { IRegionProps } from "@/interfaces/region";

function ReloadButton(props: Omit<IRegionProps, "children" | "className">) {
  const { setRegion, variants, regionName, selectedRegion } = props;

  return (
    <motion.button
      onClick={() => setRegion(regionName)}
      variants={variants}
      whileHover="animate"
      whileTap="animate"
      className={
        selectedRegion === regionName
          ? styles["map_container__reload_btn-active"]
          : styles.map_container__reload_btn
      }
    >
      <Reload />
    </motion.button>
  );
}

export default ReloadButton;
