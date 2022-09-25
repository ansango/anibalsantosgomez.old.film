import { FC } from "react";

type ImageProps = {
  src: string;
  alt: string;
  parentField?: string;
};

export const Image: FC<ImageProps> = ({ alt, src, parentField = "" }) => (
  <div
    className="flex flex-col items-center justify-center"
    data-tinafield={`${parentField}.image`}
  >
    <img className="object-cover w-full aspect-4/3" alt={alt} src={src} />
  </div>
);

export const ImageSerie: FC<ImageProps> = ({ alt, src }) => (
  <img
    className="object-cover object-center mx-auto shadow-2xl dark:shadow-black aspect-square"
    alt={alt}
    src={src}
  />
);
