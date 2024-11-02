import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import styles from "./page.module.scss";
import { Providers } from "./provider";

const comfortaa = Comfortaa({
  subsets: ["cyrillic-ext", "cyrillic"],
  weight: "400",
  variable: "--comfortaa_font",
});

export const metadata: Metadata = {
  title: "Icy Horizons",
  description:
    "Icy Horizons это сайт для знакомства пользователя любого уровня с безграничной красотой природы и культуры Республики Саха Якутия",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      <body className={`${comfortaa.className} ${styles.body}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
