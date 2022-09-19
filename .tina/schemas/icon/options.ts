import { iconColorClass, iconSizeClass } from "../../../components/util/icon";
import { iconsTheme } from "../../../constants";
import { formatFieldLabel } from "../../../utils";

export const colors = Object.keys(iconColorClass).map((color) => ({
  label: formatFieldLabel(color),
  value: color,
}));

export const sizes = Object.keys(iconSizeClass).map((size) => ({
  label: formatFieldLabel(size),
  value: size,
}));

export const names = Object.keys(iconsTheme).map((icon) => ({
  label: formatFieldLabel(icon),
  value: icon,
}));
