import { FC } from "react";

export type ImageProps = {
  src?: string;
  alt?: string;
  parentField?: string;
  aspectRatio?: "4/3" | "4/5" | string;
};

export const Image: FC<ImageProps> = ({
  alt,
  src,
  parentField = "",
  aspectRatio = "4/3",
}) => {
  const aRatio = aspectRatio === "4/5" ? "aspect-4/5" : "aspect-4/3";
  return (
    <span
      className="flex flex-col items-center justify-center"
      data-tinafield={`${parentField}.image`}
    >
      <img className={`object-cover w-full ${aRatio}`} alt={alt} src={src} />
    </span>
  );
};

export const ImageSerie: FC<ImageProps> = ({ alt, src }) => (
  <img
    className="object-cover object-center mx-auto shadow-2xl dark:shadow-black aspect-square"
    alt={alt}
    src={src}
  />
);
