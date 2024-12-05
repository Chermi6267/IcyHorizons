"use client";

import HeaderComponent from "@/components/header/header";
import styles from "./style.module.scss";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <>
      <HeaderComponent />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Dirty deeds done dirty cheep <br></br>With quality you cant beat
        </h1>
        <h3 style={{ fontWeight: 400 }} className={styles.sub_title}>
          Мы —{" "}
          <span
            style={{ fontWeight: 600 }}
            className={styles.text_span__strong}
          >
            D4C
          </span>
          . Мы решаем невозможное, не тратя лишнего.{" "}
          <span className={styles.text_span__strong}>Креатив,</span>{" "}
          <span className={styles.text_span__medium}>скорость,</span>{" "}
          <span className={styles.text_span__light}>качество</span> — вот что
          отличает нас. Мы идем вперед, ломая стандарты и преодолевая любые
          преграды, чтобы достичь{" "}
          <span className={styles.text_span__medium}>
            наилучшего результата
          </span>
        </h3>

        <div className={styles.cont}>
          <div className={styles.cont__item}>
            <div className={styles.avatar_role}>
              <div style={{ backgroundImage: `url("/maksKim.png")` }} />
              <h2
                className={styles.name_desc__prof}
                style={{ fontFamily: "var(--pacifico_font)" }}
              >
                Дизайнер
              </h2>
            </div>
            <div className={styles.name_desc}>
              <h2 className={styles.name_desc__prof}>Максим Ким</h2>
              <p className={styles.name_desc__desc}>
                У этого парня явно проблемы с башкой, но если нужно придумать
                классную фичу — он тут, как тут
              </p>
            </div>
          </div>
        </div>

        <div className={styles.cont}>
          <div className={styles.cont__item}>
            <div className={styles.avatar_role}>
              <div style={{ backgroundImage: `url("/victorChernikov.png")` }} />
              <h2
                className={styles.name_desc__prof}
                style={{ fontFamily: "var(--pixelify_font)" }}
              >
                Разработчик
              </h2>
            </div>
            <div className={styles.name_desc}>
              <h2 className={styles.name_desc__prof}>Виктор Черников</h2>
              <p className={styles.name_desc__desc}>
                Миллиардер, филантроп и вообще он классный парень и магистр
                спагетти кода
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Page;
