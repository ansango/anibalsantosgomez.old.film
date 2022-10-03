import { type FC, useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Icon } from "./icon";
import { monoTextColors } from "../styles";
import { useTheme } from "../layout";

export type ImageProps = {
  url?: string;
  alt?: string;
  parentField?: string;
  aspectRatio?: "4/3" | "4/5" | "square" | string;
  centerImage?:
    | "top"
    | "center"
    | "bottom"
    | "left"
    | "left-top"
    | "left-bottom"
    | "right"
    | "right-top"
    | "right-bottom"
    | string;

  loading?: "lazy" | "eager";
  onClick?: () => void;
};

const variants: Variants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  hidden: { opacity: 0, scale: 1 },
};

export const aspectRatioCn = {
  "4/3": "aspect-4/3",
  "4/5": "aspect-4/5",
  square: "aspect-square",
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
  alt,
  url,
  parentField = "",
  aspectRatio = "4/3",
  centerImage = "center",
  loading = "lazy",
  onClick,
}) => {
  const { mono } = useTheme();
  const control = useAnimation();
  const [ref, inView] = useInView();

  const aRatio = aspectRatioCn[aspectRatio] || aspectRatioCn["4/3"];
  const centerCn = objectPositionCn[centerImage] || objectPositionCn["center"];
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <>
      {url ? (
        <motion.span
          className={`relative flex flex-col items-center justify-center ${
            onClick ? "cursor-pointer" : ""
          }`}
          data-tinafield={`${parentField}.image`}
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={control}
          onClick={onClick}
        >
          {onClick && (
            <Icon
              data={{
                name: "fullScreen",
                size: "sm",
              }}
              className={`absolute right-4 top-12 ${monoTextColors[400][mono]}`}
            />
          )}
          <img
            className={`object-cover ${centerCn} w-full ${aRatio}`}
            loading={loading}
            alt={alt}
            src={url}
          />
        </motion.span>
      ) : null}
    </>
  );
};

export const ImageSerie: FC<ImageProps> = ({ alt, url, loading = "eager" }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  return (
    <motion.span
      className="flex flex-col items-center justify-center"
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={control}
    >
      <img
        loading={loading}
        className="object-cover object-center mx-auto shadow-2xl dark:shadow-black aspect-square"
        alt={alt}
        src={url}
      />
    </motion.span>
  );
};

export const aspectRatioResponsiveCn = {
  "4/3": "aspect-4/5 md:aspect-4/3",
  "4/5": "aspect-4/5",
};

export const centerMobileCn = {
  top: "bg-top",
  bottom: "bg-bottom",
  center: "bg-center",
  left: "bg-left",
  "left-top": "bg-left-top",
  "left-bottom": "bg-left-bottom",
  right: "bg-right",
  "right-top": "bg-right-top",
  "right-bottom": "bg-right-bottom",
};

export const ImageHero: FC<ImageProps> = ({
  url,
  parentField = "",
  aspectRatio = "4/3",
  centerImage = "center",
}) => {
  const centerMobile = centerMobileCn[centerImage] || centerMobileCn["center"];
  const aRatio =
    aspectRatioResponsiveCn[aspectRatio] || aspectRatioResponsiveCn["4/3"];
  return (
    <span data-tinafield={`${parentField}.image`}>
      <motion.div
        className={`bg-no-repeat bg-cover ${centerMobile} md:bg-center ${aRatio}`}
        style={{ backgroundImage: `url(${url})` }}
        data-tinafield={`${parentField}.image`}
      />
    </span>
  );
};
