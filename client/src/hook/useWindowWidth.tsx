import { useState, useEffect } from "react";

const useWindowWidth = (initialState: number) => {
  const [innerWidth, setInnerWidth] = useState(initialState);

  useEffect(() => {
    const resizeHandler = () => {
      setInnerWidth(window.innerWidth);
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return innerWidth;
};

export default useWindowWidth;
