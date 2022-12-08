import { type Theme, useTheme } from "components";
import {
  type IconName,
  iconSizeClass,
  iconsTheme,
  monoTextColors,
  primaryHoverTextColors,
} from "constant";
import { twMerge } from "tailwind-merge";

export const Icon = ({
  data,
  className = "",
  tinaField = "",
}: {
  data: {
    name: IconName;
    size?: keyof typeof iconSizeClass;
  };
  className?: string;
  tinaField?: string;
}) => {
  const { color, mono, icon } = useTheme();
  const iconName: IconName = data.name;
  const IconSVG = iconsTheme[icon][iconName];
  const iconSizeClasses = data.size && iconSizeClass[data.size];
  const cn = twMerge(
    `${iconSizeClasses} ${monoTextColors[600][mono]} ${primaryHoverTextColors[color]}`,
    className
  );

  return <IconSVG data-tinafield={tinaField} className={cn} />;
};
