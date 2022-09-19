import React from "react";
import Link from "next/link";
import { Container } from "../../util/container";
import { RawRenderer } from "./rawRenderer";
import { useTheme } from "..";

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

export const Footer = ({ data, rawData }) => {
  const { color, mono } = useTheme();
  const [prefix, setPrefix] = React.useState("");

  React.useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  });

  const internalLinks =
    (data.links &&
      data.links.map((link, i) => ({
        el: (
          <Link
            key={`${link.label}-${i}`}
            href={`${prefix}/${link.href}`}
            passHref
          >
            <a className="opacity-80 hover:opacity-100 transition duration-150 ease-out">
              {link.label}
            </a>
          </Link>
        ),
      }))) ||
    [];
  const socialLinks =
    (data.social &&
      data.social.map((link, i) => ({
        el: (
          <a
            key={`${link.label}-${i}-external`}
            className="opacity-80 hover:opacity-100 transition duration-150 ease-out"
            href={link.href}
            target="_blank"
          >
            {link.label}
          </a>
        ),
      }))) ||
    [];
  const links = [...internalLinks, ...socialLinks];

  const blockOneLinks = links.slice(0, 4);
  const blockTwoLinks = links.slice(4, 8);
  const blockThreeLinks = links.slice(8, 12);

  const footerColorCss =
    data.color === "primary"
      ? footerColor.primary[color]
      : footerColor.mono[mono];

  return (
    <footer className={footerColorCss}>
      <Container className="relative" size="small">
        <div className="grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
          <div className="flex flex-col space-y-4">
            {blockOneLinks.map((item) => item.el)}
          </div>
          <div className="flex flex-col space-y-4">
            {blockTwoLinks.map((item) => item.el)}
          </div>
          <div className="flex flex-col space-y-4">
            {blockThreeLinks.map((item) => item.el)}
          </div>
        </div>

        {process.env.NODE_ENV === "development" && (
          <RawRenderer parentColor={data.color} rawData={rawData} />
        )}
      </Container>
    </footer>
  );
};
