import React from "react";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Container } from "../../util/container";
import { RawRenderer } from "./rawRenderer";
import { useTheme } from "..";
import { Icon } from "../../util/icon";

const socialIconClasses = "h-7 w-auto";

const socialIconColorClasses = {
  blue: "text-blue-500 dark:text-blue-400 hover:text-blue-300",
  teal: "text-teal-500 dark:text-teal-400 hover:text-teal-300",
  green: "text-green-500 dark:text-green-400 hover:text-green-300",
  red: "text-red-500 dark:text-red-400 hover:text-red-300",
  pink: "text-pink-500 dark:text-pink-400 hover:text-pink-300",
  purple: "text-purple-500 dark:text-purple-400 hover:text-purple-300",
  orange: "text-orange-500 dark:text-orange-400 hover:text-orange-300",
  yellow: "text-yellow-500 dark:text-yellow-400 hover:text-yellow-300",
  primary: "text-white opacity-80 hover:opacity-100",
};

const footerColor = {
  mono: {
    slate: "text-slate-900 dark:text-slate-50",
    gray: "text-gray-900 dark:text-gray-50",
    zinc: "text-zinc-900 dark:text-zinc-50",
    neutral: "text-neutral-900 dark:text-neutral-50",
    stone: "text-stone-900 dark:text-stone-50",
  },
  primary: {
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
  },
};

export const Footer = ({ data, icon, rawData }) => {
  const { color, mono } = useTheme();

  const footerColorCss =
    data.color === "primary"
      ? footerColor.primary[color]
      : footerColor.mono[mono];

  return (
    <footer className={`bg-gradient-to-br ${footerColorCss}`}>
      <Container className="relative" size="small">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <Link href="/" passHref>
            <a className="group mx-2 flex items-center font-bold tracking-tight text-gray-400 dark:text-gray-300 opacity-50 hover:opacity-100 transition duration-150 ease-out whitespace-nowrap">
              <Icon
                parentColor={data.color}
                data={{
                  name: icon.name,
                  color: data.color === "primary" ? "primary" : icon.color,
                  style: icon.style,
                }}
                className="inline-block h-10 w-auto group-hover:text-orange-500"
              />
            </a>
          </Link>
          <div className="flex gap-4">
            {data.social && data.social.facebook && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.facebook}
                target="_blank"
              >
                <FaFacebookF
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[
                      data.color === "primary" ? "primary" : color
                    ]
                  }`}
                />
              </a>
            )}
            {data.social && data.social.twitter && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.twitter}
                target="_blank"
              >
                <FaTwitter
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[
                      data.color === "primary" ? "primary" : color
                    ]
                  }`}
                />
              </a>
            )}
            {data.social && data.social.instagram && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.instagram}
                target="_blank"
              >
                <AiFillInstagram
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[
                      data.color === "primary" ? "primary" : color
                    ]
                  }`}
                />
              </a>
            )}
            {data.social && data.social.github && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.github}
                target="_blank"
              >
                <FaGithub
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[
                      data.color === "primary" ? "primary" : color
                    ]
                  }`}
                />
              </a>
            )}
          </div>
          <RawRenderer parentColor={data.color} rawData={rawData} />
        </div>
      </Container>
    </footer>
  );
};
