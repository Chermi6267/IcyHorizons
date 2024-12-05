"use client";

import HeaderComponent from "@/components/header/header";
import Profile from "@/components/profile/profile";
import useAuth from "@/hook/useAuth";
import styles from "./styles.module.scss";

interface Props {}

function Page(props: Props) {
  const {} = props;
  const { isAuth, user } = useAuth();

  return (
    <>
      <HeaderComponent />
      <main className={styles.main}>
        {isAuth ? <Profile user={user} /> : null}
      </main>
    </>
  );
}

export default Page;
