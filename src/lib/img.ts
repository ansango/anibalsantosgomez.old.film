import type { aspectRatioCn, ImageProps } from "@/components";

import data from "../constants/data";
export const getBlurUrl = (obj: ImageProps): string => {
  const url = `/${obj?.url
    ?.replace(`${process.env.NEXT_PUBLIC_BUCKET_URL}`, "")
    .split("/")
    .slice(1, 4)
    .join("/")}`;

  const image = data.filter((ob) => ob.url === url)[0]?.img;

  return image;
};

export const getSize = (
  ratio: keyof typeof aspectRatioCn | string
): {
  width: number;
  height: number;
} => {
  const aspectRatios: { [key: string]: { width: number; height: number } } = {
    "4/3": { width: 1024, height: 768 },
    "4/5": { width: 768, height: 960 },
    "5/4": { width: 960, height: 768 },
    "9/16": { width: 576, height: 1024 },
    "2/3": { width: 1024, height: 682 },
    "3/2": { width: 1024, height: 682 },
    square: { width: 1024, height: 1024 },
    video: { width: 1024, height: 576 },
  };

  const { width, height } = aspectRatios[ratio];

  if (width > height) {
    return { width: 1920, height: 1080 };
  } else {
    return { width: 1080, height: 1920 };
  }
};
