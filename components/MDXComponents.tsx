import Link from "next/link";
import Image, { ImageProps } from "next/image";
import formatDate from "lib/utils/formatDate";
import { FC } from "react";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

type ImgProps = { type?: "landscape" | "portrait" } & ImageProps;

const boxVariant = {
  visible: { opacity: 1, transition: { duration: 1 } },
  hidden: { opacity: 0 },
};

export const ImageRender: FC<ImgProps> = ({ type = "landscape", ...props }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  const width = type === "landscape" ? 2048 : 1365;
  const height = type === "landscape" ? 1365 : 2048;
  return (
    <motion.div
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
      className="flex justify-center mb-5 md:mb-10 lg:mb-20 xl:mb-32"
    >
      <Image alt={props.alt} width={width} height={height} {...props} />
    </motion.div>
  );
};

export const Note = ({ text = "" }) => {
  return <p className="my-2 italic text-sm">{text}</p>;
};

export const Meta = ({
  translations,
  locale,
  meta,
}: {
  locale: string;
  translations: {
    [key: string]: string;
  };
  meta: {
    camera: "Canon EOS 50E" | "Canon EOS 6D";
    film?: {
      brand: "Ilford" | "Kodak" | "Fujifilm" | string;
      model: string;
      iso: number;
    };
    period: { start: string; end: string };
    location: {
      city: string;
      country: string;
    }[];
  };
}) => {
  const { camera, film, location, period } = meta;
  return (
    <ul className="px-0 text-base pb-5 md:pb-10 lg:pb-20 lowercase">
      <li className="flex justify-start px-0">
        <span className="mr-3 text-gray-400 font-medium">
          {translations.camera}
        </span>
        <span className="font-medium">{camera}</span>
      </li>
      {film && (
        <li className="flex justify-start px-0">
          <span className="mr-3 font-medium text-gray-400">
            {translations.film}
          </span>
          <span className="font-medium">
            {film.brand} {film.model} / {film.iso}
          </span>
        </li>
      )}
      <li className="flex justify-start px-0">
        <span className="mr-3 font-medium text-gray-400">
          {translations.period}
        </span>
        <span className="font-medium">
          {formatDate(period.start, locale)} - {formatDate(period.end, locale)}
        </span>
      </li>
      <li className="flex justify-start px-0">
        <span className="mr-3 font-medium text-gray-400">
          {translations.location}
        </span>
        <span className="font-medium">
          {location.map((l) => `${l.city}, ${l.country}`).join(" / ")}
        </span>
      </li>
    </ul>
  );
};

const MDXComponents = {
  Image: ImageRender,
  Meta,
  a: CustomLink,
};

export default MDXComponents;
