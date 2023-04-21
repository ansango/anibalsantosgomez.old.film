import type { FC } from "react";

import { motion } from "framer-motion";
import ImageNext from "next/image";

import { getSize } from "../lib";

type AspectRatio = {
  "4/3": "aspect-4/3";
  "4/5": "aspect-4/5";
  "5/4": "aspect-5/4";
  "9/16": "aspect-9/16";
  "2/3": "aspect-2/3";
  "3/2": "aspect-3/2";
  square: "aspect-square";
  video: "aspect-video";
};

export type ImageProps = {
  url?: string;
  alt?: string;
  aspectRatio?: keyof AspectRatio;
  centerImage?:
    | "top"
    | "center"
    | "bottom"
    | "left"
    | "left-top"
    | "left-bottom"
    | "right"
    | "right-top"
    | "right-bottom";
  blurDataURL?: string;
  loading?: "lazy" | "eager";
  onClick?: () => void;
};

export const aspectRatioCn = {
  "4/3": "aspect-4/3",
  "4/5": "aspect-4/5",
  "5/4": "aspect-5/4",
  "9/16": "aspect-9/16",
  "2/3": "aspect-2/3",
  "3/2": "aspect-3/2",
  square: "aspect-square",
  video: "aspect-video",
};

export const objectPositionCn = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
  left: "object-left",
  "left-top": "object-left-top",
  "left-bottom": "object-left-bottom",
  right: "object-right",
  "right-top": "object-right-top",
  "right-bottom": "object-right-bottom",
};

export const Image: FC<ImageProps> = ({
  alt = "",
  url,
  aspectRatio = "4/3",
  centerImage = "center",
  loading = "lazy",
  onClick,
  blurDataURL,
}) => {
  const centerCn = objectPositionCn[centerImage] || objectPositionCn["center"];

  return (
    <motion.span
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col items-center"
    >
      {url ? (
        <ImageNext
          className={`object-cover ${centerCn} ${aspectRatioCn[aspectRatio]} ${
            onClick
              ? `duration-300 transform transition-all cursor-pointer hover:opacity-[0.89] group-hover:opacity-[0.89]`
              : "max-w-s"
          }`}
          src={url}
          {...getSize(aspectRatio)}
          alt={alt}
          loading={loading}
          onClick={onClick}
          priority={loading === "eager" ? true : false}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
        />
      ) : null}
    </motion.span>
  );
};

export const aspectRatio = Object.keys(aspectRatioCn);
export const centerImage = Object.keys(objectPositionCn);
