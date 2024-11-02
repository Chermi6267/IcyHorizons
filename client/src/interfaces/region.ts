import { ReactElement } from "react";

export interface IRegionProps {
  setRegion: (region: string) => void;
  selectedRegion: string;
  variants: {
    hidden: {};
    animate: {};
  };
  regionName: string;
  children: ReactElement;
  className: string;
}
