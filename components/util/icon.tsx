import * as React from "react";
import { useTheme } from "../layout";
import { formatFieldLabel } from "../../lib/utils";
import { TinaField } from "tinacms";

import {
  Bars2Icon,
  XMarkIcon,
  CodeBracketIcon,
  HandThumbUpIcon,
  MapIcon,
  SwatchIcon,
  ChartBarIcon,
  MapPinIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
  ShoppingBagIcon,
  BeakerIcon,
  UserIcon,
  ChatBubbleBottomCenterIcon,
  CloudIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { monoTextColors, primaryHoverTextColors } from "../styles";

export const iconsTheme = {
  hi: {
    menu: Bars2Icon,
    close: XMarkIcon,
    eye: EyeIcon,
    search: MagnifyingGlassIcon,
    check: CheckIcon,
    code: CodeBracketIcon,
    like: HandThumbUpIcon,
    map: MapIcon,
    palette: SwatchIcon,
    chart: ChartBarIcon,
    pin: MapPinIcon,
    shield: ShieldCheckIcon,
    settings: AdjustmentsHorizontalIcon,
    store: ShoppingBagIcon,
    tube: BeakerIcon,
    user: UserIcon,
    chat: ChatBubbleBottomCenterIcon,
    cloud: CloudIcon,
  },
};

export const iconSizeClass = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
  "2xl": "w-20 h-20",
};

export const Icon = ({ data, className = "", tinaField = "" }) => {
  const { color, mono, icon } = useTheme();
  const iconName = data.name;
  const IconSVG = iconsTheme[icon][iconName];
  const iconSizeClasses = data.size && iconSizeClass[data.size];
  console.log(
    `${iconSizeClasses} ${monoTextColors[600][mono]} ${primaryHoverTextColors[color]} ${className}`
  );
  return (
    <IconSVG
      data-tinafield={tinaField}
      className={`${iconSizeClasses} ${monoTextColors[600][mono]} ${primaryHoverTextColors[color]} ${className}`}
    />
  );
};

const sizes = Object.keys(iconSizeClass).map((size) => ({
  label: size,
  value: size,
}));

const names = Object.keys(iconsTheme).map((icon) => ({
  label: formatFieldLabel(icon),
  value: icon,
}));

export const iconSchema: TinaField = {
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
