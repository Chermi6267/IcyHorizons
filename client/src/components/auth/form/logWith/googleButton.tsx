import GoogleSvg from "@/components/svg/google";
import styles from "../../styles.module.scss";
import { signIn } from "next-auth/react";

interface Props {}

function GoogleButton(props: Props) {
  const {} = props;

  const handleSignIn = async () => {
    // alert("Функция находиться в разработке");
    try {
      const result = await signIn("google", { redirect: true });
      if (result?.error) {
        console.error("Error signing in:", result.error);
      } else {
        console.log("Sign-in successful", result);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className={styles.log_with_container__btn}
      type="button"
    >
      <GoogleSvg className={styles["btn__svg-google"]} />
    </button>
  );
}

export default GoogleButton;
