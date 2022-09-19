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
} from "@heroicons/react/24/outline";

export const iconsTheme = {
  menu: { hi: Bars2Icon },
  close: { hi: XMarkIcon },
  eye: { hi: EyeIcon },
  // defaults
  code: { hi: CodeBracketIcon },
  like: { hi: HandThumbUpIcon },
  map: { hi: MapIcon },
  palette: { hi: SwatchIcon },
  chart: { hi: ChartBarIcon },
  pin: { hi: MapPinIcon },
  shield: { hi: ShieldCheckIcon },
  settings: { hi: AdjustmentsHorizontalIcon },
  store: { hi: ShoppingBagIcon },
  tube: { hi: BeakerIcon },
  user: { hi: UserIcon },
  chat: { hi: ChatBubbleBottomCenterIcon },
  cloud: { hi: CloudIcon },
};

export const iconSets = [
  {
    label: "Heroicons",
    value: "heroicon",
  },
];
