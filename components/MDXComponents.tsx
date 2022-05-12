import Link from "next/link";
import Image, { ImageProps } from "next/image";

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

const ImageRender = (props: ImageProps) => {
  return <Image alt={props.alt} {...props} width={4614} height={3076} className="rounded-sm" />;
};

const Note = ({ text = "" }) => {
  return <p className="my-2 italic text-sm">{text}</p>;
};

const Cover = ({ children }) => {
  return <div className="cover">{children}</div>;
};

const MDXComponents = {
  Image: ImageRender,
  Note,
  Cover,
  a: CustomLink,
};

export default MDXComponents;
