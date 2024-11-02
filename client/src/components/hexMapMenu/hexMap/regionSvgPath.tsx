import { motion } from "framer-motion";
import { IRegionProps } from "@/interfaces/region";
import styles from "../styles.module.scss";

function RegionSvgPath(props: IRegionProps) {
  const {
    children,
    setRegion,
    variants,
    selectedRegion,
    regionName,
    className,
  } = props;

  const adaptiveClassName =
    selectedRegion === regionName
      ? `${className} ${styles["hex_map__region_path-active"]}`
      : `${className}`;

  return (
    <motion.path
      variants={variants}
      initial="hidden"
      whileHover="animate"
      whileTap="animate"
      onClick={() => setRegion(regionName)}
      className={adaptiveClassName}
      {...children.props}
    />
  );
}

export default RegionSvgPath;
