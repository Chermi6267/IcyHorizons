"use client";

import HexMapMenu from "@/components/hexMapMenu/hexMapMenu";
import styles from "./page.module.scss";
import "./globals.scss";
import Header from "@/components/header/header";
import Catalog from "@/components/catalog/catalog";
import { IAdminCenter, ICategory, ILandmark } from "@/interfaces/landmark";
import { setLandmarks } from "@/store/landmarkSlice";
import { sortByRating } from "@/utils/sortByRating";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Home(props: {
  landmarks: ILandmark[];
  adminCenter: IAdminCenter;
  categories: ICategory[];
}) {
  const { landmarks, adminCenter, categories } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLandmarks(sortByRating(landmarks, "desc")));
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <HexMapMenu
          initialLandmarkData={landmarks}
          initialAdminCenterData={adminCenter}
        />
        <Catalog
          initialLandmarkData={landmarks}
          initialAdminCenterData={adminCenter}
          categories={categories}
        />
      </main>
    </>
  );
}
