import { ILandmarkPhoto } from "@/interfaces/landmark";
import SliderImage from "./sliderImage";
import styles from "./styles.module.scss";
import { useState } from "react";
import IncrementButton from "./incrementButton";
import DecrementButton from "./decrementButton";

interface Props {
  className: string;
  images: ILandmarkPhoto[];
}

function Slider(props: Props) {
  const { className, images } = props;
  const [sliderState, setSliderState] = useState(0);

  const numImages = images.length;

  const handleNext = () => {
    if (sliderState === numImages - 1) {
      setSliderState(0);
    } else {
      setSliderState((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (sliderState === 0) {
      setSliderState(numImages - 1);
    } else {
      setSliderState((prev) => prev - 1);
    }
  };

  return (
    <div className={className}>
      <IncrementButton onClick={handleNext} />

      <DecrementButton onClick={handlePrevious} />
      <div className={styles.slider__wrapper}>
        {[...images.slice(-1), ...images, ...images.slice(0, 1)].map(
          (image, index) => {
            const adjustedIndex = index - 1;
            return (
              <div
                key={index}
                className={styles.slider__img_container}
                style={{
                  transform: `translateX(${
                    (adjustedIndex - sliderState) * 100
                  }%)`,
                  transition: "transform 0.5s ease",
                }}
              >
                <SliderImage imgName={image.photoPath} />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default Slider;
