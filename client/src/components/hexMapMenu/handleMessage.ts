import { MutableRefObject, SetStateAction } from "react";

interface IHandleMessage {
  text: string;
  gigaTextRef: MutableRefObject<HTMLDivElement | null>;
  setGigaText: (value: SetStateAction<string>) => void;
  setIsGigaFetching: (value: SetStateAction<boolean>) => void;
  setIsGigaError: (value: SetStateAction<boolean>) => void;
}

export const handleMessage = (data: IHandleMessage) => {
  const { text, gigaTextRef, setGigaText, setIsGigaFetching, setIsGigaError } =
    data;

  if (text === "undefined") {
    return;
  }

  if (text === "==ERROR==") {
    setIsGigaError(true);
    setIsGigaFetching(false);
    return;
  }

  if (text === "==DONE==") {
    setTimeout(() => {
      setIsGigaFetching(false);
    }, 1000);

    return;
  }

  const correctText = text ? text : "";

  setGigaText((prev) => prev + correctText);

  // setTimeout(() => {
  //   if (gigaTextRef.current !== null) {
  //     gigaTextRef.current.scroll({
  //       top: gigaTextRef.current.scrollHeight,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   }
  // }, 0);

  return;
};
