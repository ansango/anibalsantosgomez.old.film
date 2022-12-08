import {
  Bars2Icon,
  XMarkIcon,
  CodeBracketIcon,
  HandThumbUpIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  CheckIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import { SiTelegram, SiWhatsapp, SiTwitter, SiGmail } from "react-icons/si";
import { BiCookie } from "react-icons/bi";

export type IconName = keyof typeof iconsTheme.hi;

export const iconsTheme = {
  hi: {
    menu: Bars2Icon,
    close: XMarkIcon,
    eye: EyeIcon,
    search: MagnifyingGlassIcon,
    fullScreen: ViewfinderCircleIcon,
    check: CheckIcon,
    code: CodeBracketIcon,
    like: HandThumbUpIcon,
    email: SiGmail,
    telegram: SiTelegram,
    whatsapp: SiWhatsapp,
    twitter: SiTwitter,
    cookie: BiCookie,
  },
};

export const iconSizeClass = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
  "2xl": "w-20 h-20",
};
