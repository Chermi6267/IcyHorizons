import styles from "./styles.module.scss";

interface Props {}

function Footer(props: Props) {
  const {} = props;

  return (
    <footer className={styles.footer}>
      <p>
        Directed by Виктор Черников and Максим Ким. <br></br>Все права защищены
        ©.
      </p>
    </footer>
  );
}

export default Footer;
