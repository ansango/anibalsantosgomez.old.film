import { TinaField } from "tinacms";
import { iconColorClass, iconSizeClass } from "../../../components/util/icon";
import { iconsTheme } from "../../../constants";
import { colors, sizes, names } from "./options";

export const iconSchema: TinaField = {
  type: "object",
  label: "Icon",
  name: "icon",
  fields: [
    {
      type: "string",
      label: "Color",
      name: "color",
      options: colors,
    },
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
