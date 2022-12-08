import type { SchemaField } from "tinacms";
import { iconSizeClass, iconsTheme } from "../../constant";
import { formatFieldLabel } from "../../lib/utils";

const sizes = Object.keys(iconSizeClass).map((size) => ({
  label: size,
  value: size,
}));

const names = Object.keys(iconsTheme).map((icon) => ({
  label: formatFieldLabel(icon),
  value: icon,
}));

export const icon: SchemaField = {
  type: "object",
  label: "Icon",
  name: "icon",
  fields: [
    {
      type: "string",
      label: "Size",
      name: "size",
      options: sizes,
    },
    {
      type: "string",
      label: "Icon",
      name: "name",
      options: names,
    },
  ],
};
