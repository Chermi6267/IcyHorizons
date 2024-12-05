"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

interface Props {}

function Footer(props: Props) {
  const {} = props;
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <p>
        Designed by Виктор Черников and Максим Ким. <br></br>Все права защищены
        ©.
      </p>
      <button
        onClick={() => {
          router.push("/about");
        }}
      >
        О нас
      </button>
    </footer>
  );
}

export default Footer;
