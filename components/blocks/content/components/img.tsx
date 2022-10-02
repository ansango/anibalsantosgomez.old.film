import { Image as ImageComponent, type ImageProps } from "../../../util/image";

export const img = (props) => (
  <span className="flex items-center justify-center">
    <img
      src={props.url}
      alt={props.alt}
      className="object-cover w-full aspect-4/3"
    />
  </span>
);

const Image = (props: ImageProps) => {
  return (
    <>
      <ImageComponent {...props} />
    </>
  );
};

export { Image, type ImageProps };
