"use client";

import styles from "./styles.module.scss";
import Header from "@/components/header/header";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import AuthHandler from "@/components/auth/authHandler";
import Arrow from "@/components/svg/arrow";
import Footer from "@/components/footer/footer";

const LandmarkContent = dynamic(() => import("./landmarkContent"), {
  ssr: false,
});

function LandmarkPage() {
  const [needRefetch, setNeedRefetch] = useState(false);

  return (
    <>
      <AuthHandler />
      <Header />

      <main className={styles.main}>
        <Link
          href={`/?needRefetch=${needRefetch}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <button className={styles.empty_btn}>
            <div className={styles.back_arrow}>
              <Arrow className={styles.back_arrow__svg} />
              <p className={styles.back_arrow__text}>Назад</p>
            </div>
          </button>
        </Link>

        <Suspense>
          <LandmarkContent setNeedRefetch={(v: boolean) => setNeedRefetch(v)} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default LandmarkPage;
