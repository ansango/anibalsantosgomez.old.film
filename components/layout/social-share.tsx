import { FC, MouseEvent } from "react";
import {
  TelegramShareButton as Telegram,
  TwitterShareButton as Twitter,
  WhatsappShareButton as Whatsapp,
} from "react-share";
import { monoTextColors } from "../styles";
import { Container } from "../util/container";
import { Icon } from "../util/icon";
import { useTheme } from "./theme";
import { eEngagementEvents } from "../../lib/ga";

const buttons = [
  {
    name: "telegram",
    icon: {
      name: "telegram",
    },
    Component: Telegram,
  },
  {
    name: "twitter",
    icon: {
      name: "twitter",
    },
    Component: Twitter,
  },
  {
    name: "whatsapp",
    icon: {
      name: "whatsapp",
    },
    Component: Whatsapp,
  },
];

export const SocialShare: FC<{ title: string; url: string }> = ({
  title,
  url,
}) => {
  const { mono } = useTheme();
  const { eShare } = eEngagementEvents;
  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    social: string
  ) => {
    e.preventDefault();
    eShare({ label: social });
  };
  return (
    <Container className="flex space-x-2 py-0 lg:py-0">
      {buttons.map(({ name, Component, icon }, index) => {
        return (
          <Component
            key={`${name}-${index}`}
            url={url}
            title={title}
            onClick={(e) => handleClick(e, name)}
          >
            <Icon
              data={icon}
              className={`${monoTextColors[500][mono]} w-[1.25rem] h-[1.25rem]`}
            />
          </Component>
        );
      })}
    </Container>
  );
};
