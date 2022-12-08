import { aspectRatioCn, objectPositionCn } from "constant";
import type { FC } from "react";
import ImageNext from "next/image";

export type ImageProps = {
  url?: string;
  alt?: string;
  parentField?: string;
  aspectRatio?: keyof typeof aspectRatioCn;
  centerImage?: keyof typeof objectPositionCn;
  loading?: "lazy" | "eager";
  onClick?: () => void;
};

const getSize = (aspectRatio: keyof typeof aspectRatioCn | string) => {
  switch (aspectRatio) {
    case "2/3":
      return { width: 1365, height: 2048 };
    case "3/2":
      return { width: 2048, height: 1365 };
    case "4/3":
      return { width: 2048, height: 1536 };
    case "4/5":
      return { width: 1638, height: 2048 };
    case "5/4":
      return { width: 2048, height: 1638 };
    case "9/16":
      return { width: 1152, height: 2048 };
    case "auto":
      return { width: 2048, height: 1365 };
    case "square":
      return { width: 2048, height: 2048 };
    case "video":
      return { width: 2048, height: 1152 };
  }
};

export const Image = ({
  alt,
  url,
  parentField = "",
  aspectRatio = "auto",
  centerImage = "center",
  loading = "lazy",
  onClick,
}: ImageProps) => {
  const centerCn = objectPositionCn[centerImage] || objectPositionCn["center"];
  const aspectRCn = aspectRatioCn[aspectRatio] || aspectRatioCn["auto"];
  return (
    <span className="flex flex-col">
      {url ? (
        <ImageNext
          className={`object-cover ${centerCn} ${aspectRCn} ${
            onClick
              ? "cursor-pointer hover:opacity-80 group-hover:opacity-80 transition-all duration-300"
              : ""
          }`}
          src={url}
          {...getSize(aspectRatio)}
          alt={alt || ""}
          loading={loading}
          data-tinafield={`${parentField}.image`}
          onClick={onClick}
        />
      ) : null}
    </span>
  );
};
