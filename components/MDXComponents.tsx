import Link from "next/link";
import Image, { ImageProps } from "next/image";
import { Blog } from "contentlayer/generated";
import formatDate from "lib/formatDate";

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

export const ImageRender = (props: ImageProps) => {
  return (
    <Image
      alt={props.alt}
      {...props}
      width={1152}
      height={768}
      className="rounded-sm"
    />
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
        <span className="italic">{camera}</span>
      </li>
      {film && (
        <li className="flex justify-between md:justify-start px-0">
          <span className="mr-3 font-medium">{translations.film}:</span>
          <span className="italic">
            {film.brand} {film.model} {film.iso}
          </span>
        </li>
      )}
      <li className="flex justify-between md:justify-start px-0">
        <span className="mr-3 font-medium">{translations.period}:</span>
        <span className="italic">
          {formatDate(period.start, locale)} - {formatDate(period.end, locale)}
        </span>
      </li>
      <li className="flex justify-between md:justify-start px-0">
        <span className="mr-3 font-medium">{translations.location}:</span>
        <span className="italic">
          {location.map((l) => `${l.city}, ${l.country}`).join(" / ")}
        </span>
      </li>
    </ul>
  );
};

const MDXComponents = {
  Image: ImageRender,
  Note,
  Meta,
  a: CustomLink,
};

export default MDXComponents;
