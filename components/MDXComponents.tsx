import Link from "next/link";
import Image, { ImageProps } from "next/image";
import formatDate from "lib/formatDate";
import { FC } from "react";

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

export const ImageRender: FC<ImgProps> = ({ type = "landscape", ...props }) => {
  const width = type === "landscape" ? 1152 : 768;
  const height = type === "landscape" ? 768 : 1152;
  return (
    <div className="flex justify-center mb-10">
      <Image alt={props.alt} width={width} height={height} {...props} />
    </div>
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
    <ul className="px-0 text-sm md:text-base">
      <li className="flex justify-between md:justify-start px-0">
        <span className="mr-3 font-medium">{translations.camera}:</span>
        <span>{camera}</span>
      </li>
      {film && (
        <li className="flex justify-between md:justify-start px-0">
          <span className="mr-3 font-medium">{translations.film}:</span>
          <span>
            {film.brand} {film.model} {film.iso}
          </span>
        </li>
      )}
      <li className="flex justify-between md:justify-start px-0">
        <span className="mr-3 font-medium">{translations.period}:</span>
        <span>
          {formatDate(period.start, locale)} - {formatDate(period.end, locale)}
        </span>
      </li>
      <li className="flex justify-between md:justify-start px-0">
        <span className="mr-3 font-medium">{translations.location}:</span>
        <span>
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
