import { Image, type ImageProps } from "../../../util/image";

export const img = (props) => (
  <span className="flex items-center justify-center">
    <img
      src={props.url}
      alt={props.alt}
      className="object-cover w-full aspect-auto"
    />
  </span>
);

export { Image, type ImageProps };
