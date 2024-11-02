import GoogleButton from "./googleButton";
import styles from "../../styles.module.scss";

interface Props {}

function LogWith(props: Props) {
  const {} = props;

  return (
    <div className={styles.log_with_container}>
      <GoogleButton />
    </div>
  );
}

export default LogWith;
