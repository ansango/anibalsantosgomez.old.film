import { Image, type ImageProps } from "../../../util/image";
export { Image, type ImageProps };
export const img = (props) => (
  <span className="flex items-center justify-center">
    <img
      src={props.url}
      alt={props.alt}
      className="object-cover w-full aspect-4/3"
    />
  </span>
);


