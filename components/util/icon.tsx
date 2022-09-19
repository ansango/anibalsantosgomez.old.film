import * as React from "react";
import { useTheme } from "../layout";
import { iconsTheme } from "../../constants";

export const iconColorClass = {
  red: "text-red-600 dark:text-red-400",
  orange: "text-orange-600 dark:text-orange-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
  amber: "text-amber-600 dark:text-amber-400",
  lime: "text-lime-600 dark:text-lime-400",
  green: "text-green-600 dark:text-green-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  teal: "text-teal-600 dark:text-teal-400",
  cyan: "text-cyan-600 dark:text-cyan-400",
  sky: "text-sky-600 dark:text-sky-400",
  blue: "text-blue-600 dark:text-blue-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
  violet: "text-violet-600 dark:text-violet-400",
  purple: "text-purple-600 dark:text-purple-400",
  fuchsia: "text-fuchsia-600 dark:text-fuchsia-400",
  pink: "text-pink-600 dark:text-pink-400",
  rose: "text-rose-600 dark:text-rose-400",
};

export const iconMonoClass = {
  white: {
    slate: "text-slate-50 dark:text-slate-900",
    gray: "text-gray-50 dark:text-gray-900",
    zinc: "text-zinc-50 dark:text-zinc-900",
    neutral: "text-neutral-50 dark:text-neutral-900",
    stone: "text-stone-50 dark:text-stone-900",
  },
  black: {
    slate: "text-slate-900 dark:text-slate-50",
    gray: "text-gray-900 dark:text-gray-50",
    zinc: "text-zinc-900 dark:text-zinc-50",
    neutral: "text-neutral-900 dark:text-neutral-50",
    stone: "text-stone-900 dark:text-stone-50",
  },
};

export const iconSizeClass = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
  "2xl": "w-20 h-20",
};

export const Icon = ({
  data,
  parentColor = "",
  className = "",
  tinaField = "",
}) => {
  const theme = useTheme();
  const iconName = data.name || Object.keys(iconsTheme)[0];
  const IconSVG = iconsTheme[iconName][theme.icon === "heroicon" ? "hi" : ""];

  const iconSizeClasses = data.size && iconSizeClass[data.size];

  const iconColor = data.color
    ? data.color === "primary"
      ? theme.color
      : data.color
    : theme.color;

  const white = iconMonoClass["white"][theme.mono];

  const iconColorClasses =
    iconColorClass[
      parentColor === "primary" &&
      (iconColor === theme.color || iconColor === "primary")
        ? white
        : iconColor
    ];

  return (
    <IconSVG
      data-tinafield={tinaField}
      className={`${iconSizeClasses} ${iconColorClasses} ${className}`}
    />
  );
};
