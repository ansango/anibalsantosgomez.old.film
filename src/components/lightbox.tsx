"use client";

import type { FC, ReactNode } from "react";
import { useEffect, useContext, createContext, useState } from "react";

import Box from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { getBlurUrl } from "../lib";

import type { ImageProps } from "./image";
import { Image } from "./image";
import type { MasonryProps } from "./masonry";
import { Masonry } from "./masonry";

type Slide = {
  src: string;
  index: number;
};

type LightBoxContextType = {
  slides: Array<Slide>;
  setSlides: (slides: Array<Slide>) => void;
  index: number;
  setIndex: (value: number) => void;
};

const initialState: LightBoxContextType = {
  slides: [],
  setSlides: (slides) => console.log("setSlides", slides),
  index: -1,
  setIndex: (value) => console.log("setIndex", value),
};

const LightBoxContext = createContext(initialState);

export const useLightBox = () => useContext(LightBoxContext);

export const LightBox: FC<{ children: ReactNode }> = ({ children }) => {
  const [index, setIndex] = useState<number>(-1);
  const [slides, setSlides] = useState<Array<Slide>>([]);

  return (
    <LightBoxContext.Provider
      value={{
        slides,
        setSlides,
        index,
        setIndex,
      }}
    >
      {children}

      <Box
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Fullscreen]}
      />
    </LightBoxContext.Provider>
  );
};

type Images = { images: Array<Omit<ImageProps, "alt"> & { label: string }> };

export type MasonryWithLightBoxProps = Omit<MasonryProps, "children"> & Images;

export const MasonryWidget: FC<MasonryWithLightBoxProps> = ({ columns, gap, images }) => {
  const { setIndex, setSlides } = useLightBox();

  useEffect(() => {
    if (images) {
      const mappedImages = images.map((img, index) => {
        return {
          src: img.url || "",
          index,
        };
      });
      setSlides(mappedImages);
    }
  }, [images, setSlides]);

  return (
    <Masonry columns={columns} gap={gap}>
      {images.map((image, index) => (
        <Image
          key={index}
          {...image}
          alt={image.label}
          onClick={() => setIndex(index)}
          loading={index < 4 ? "eager" : "lazy"}
          blurDataURL={getBlurUrl(image as ImageProps)}
        />
      ))}
    </Masonry>
  );
};

const MasonryWithLightBox: FC<MasonryWithLightBoxProps> = ({ columns, gap, images }) => {
  return (
    <LightBox>{images && <MasonryWidget columns={columns} gap={gap} images={images} />}</LightBox>
  );
};

export default MasonryWithLightBox;
