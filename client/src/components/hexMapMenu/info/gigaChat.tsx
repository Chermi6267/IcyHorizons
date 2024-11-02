import { MutableRefObject } from "react";
import styles from "../styles.module.scss";

interface Props {
  text: string;
  isFetching: boolean;
  isError: boolean;
  gigaTextRef: MutableRefObject<HTMLDivElement | null>;
}

function GigaChat(props: Props) {
  const { text, gigaTextRef, isFetching, isError } = props;

  return (
    <>
      <h1 className={styles.giga_chat__main_text}>Giga Chat</h1>
      <p ref={gigaTextRef} className={styles.giga_chat__giga_text}>
        {isError ? (
          "Хелоу сын собаки, ты 6 минут на сапе не можешь мелкий Кемп разбанить, я стою под их тавер, очнись сын *****, ты не видишь что вообще в игре происходит, нас имеют, АЛЛЛО ПРИЁМ , ты собрал сранвй Мидас и дезоль на Снепке , херачишь мой лес , и что-то там пытаешься высрать из своего грязного Рта, будь добр - никогда в жизни не открывай свою пасть, пока я тебе не разрешу сын ***** "
        ) : (
          <>
            {text}
            {isFetching && <span className={styles.blinking_cursor}></span>}
          </>
        )}
      </p>
    </>
  );
}

export default GigaChat;
