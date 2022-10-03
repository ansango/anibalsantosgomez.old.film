import { FC } from "react";
import {
  EmailShareButton as Email,
  TelegramShareButton as Telegram,
  TwitterShareButton as Twitter,
  WhatsappShareButton as Whatsapp,
} from "react-share";
import { monoTextColors } from "../styles";
import { Container } from "../util/container";
import { Icon } from "../util/icon";
import { useTheme } from "./theme";

const buttons = [
  {
    name: "email",
    icon: {
      name: "email",
      size: "sm",
    },
    Component: Email,
  },
  {
    name: "telegram",
    icon: {
      name: "telegram",
      size: "sm",
    },
    Component: Telegram,
  },
  {
    name: "twitter",
    icon: {
      name: "twitter",
      size: "sm",
    },
    Component: Twitter,
  },
  {
    name: "whatsapp",
    icon: {
      name: "whatsapp",
      size: "sm",
    },
    Component: Whatsapp,
  },
];

export const SocialShare: FC<{ title: string; url: string }> = ({
  title,
  url,
}) => {
  const { mono } = useTheme();
  return (
    <Container className=" flex space-x-2">
      {buttons.map(({ name, Component, icon }, index) => {
        return (
          <div key={`${name}-${index}`}>
            <Component url={url} title={title}>
              <Icon
                data={icon}
                className={`w-5 h-5 ${monoTextColors[500][mono]}`}
              />
            </Component>
          </div>
        );
      })}
    </Container>
  );
};
