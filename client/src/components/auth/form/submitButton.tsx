import styles from "../styles.module.scss";

interface Props {
  text: string;
}

function SubmitButton(props: Props) {
  const { text } = props;

  return (
    <button type="submit" className={styles.submit_btn}>
      {text}
    </button>
  );
}

export default SubmitButton;
