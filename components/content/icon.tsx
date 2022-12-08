import { useTheme } from "components/layout";
import { formatFieldLabel } from "lib/utils";
import type { SchemaField } from "tinacms";
import {
  iconSizeClass,
  iconsTheme,
  monoTextColors,
  primaryHoverTextColors,
} from "constant";

export const Icon = ({ data, className = "", tinaField = "" }) => {
  const { color, mono, icon } = useTheme();
  const iconName = data.name;
  const IconSVG = iconsTheme[icon][iconName];
  const iconSizeClasses = data.size && iconSizeClass[data.size];

  return (
    <IconSVG
      data-tinafield={tinaField}
      className={`${iconSizeClasses} ${monoTextColors[600][mono]} ${primaryHoverTextColors[color]} ${className}`}
    />
  );
};
