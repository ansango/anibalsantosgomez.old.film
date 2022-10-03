import { useTheme } from "../../../layout";
import { monoTextColors } from "../../../styles";
import { Icon } from "../../../util/icon";
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
  const { mono } = useTheme();
  return (
    <div className="relative" onClick={props.onClick}>
      <Icon
        data={{
          name: "fullScreen",
          size: "sm",
        }}
        className={`absolute right-4 top-12 cursor-pointer ${monoTextColors[400][mono]}`}
      />
      <ImageComponent {...props} />
    </div>
  );
};

export { Image, type ImageProps };
