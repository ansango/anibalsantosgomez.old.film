export type ImgProps = {
  url: string;
  alt: string;
  aspectRatio: "4/3" | "4/5";
};

export const img = (props: ImgProps) => (
  <span className="flex items-center justify-center">
    <img
      src={props.url}
      alt={props.alt}
      className="object-cover w-full aspect-4/3"
    />
  </span>
);

export const Image = ({ alt, aspectRatio = "4/3", url }: ImgProps) => {
  const aRatio = aspectRatio === "4/5" ? "aspect-4/5" : "aspect-4/3";

  return (
    <span className="flex flex-col items-center justify-center">
      <img src={url} alt={alt} className={`object-cover w-full ${aRatio}`} />
    </span>
  );
};
