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
            <li>
              <a className="text-sm font-normal text-gray-500 hover:text-gray-900">
                {link.label}
              </a>
            </li>
          </Link>
        ),
      }))) ||
    [];
  const socialLinks =
    (data.social &&
      data.social.map((link, i) => ({
        el: (
          <li key={`${link.label}-${i}-external`}>
            <a
              className="text-sm font-normal text-gray-500 hover:text-gray-900"
              href={link.href}
              target="_blank"
            >
              {link.label}
            </a>
          </li>
        ),
      }))) ||
    [];

  const footerColorCss =
    data.color === "primary"
      ? footerColor.primary[color]
      : footerColor.mono[mono];

  return (
    <>
      <footer className="bg-gray-50" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <Container>
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <a
                href="./index.html"
                className="text-lg font-bold tracking-tighter text-blue-600 transition duration-500 ease-in-out transform tracking-relaxed lg:pr-8"
              >
                anibalsantos
              </a>
              <p className="w-1/2 mt-2 text-sm text-gray-500">
                film captures / miscellaneous
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-12 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
                    Navigation
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {internalLinks.map((link, i) => link.el)}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
                    Social
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {socialLinks.map((link, i) => link.el)}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-12 mt-12 mx-auto bg-gray-100 max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-20">
            <span className="mt-2 text-sm font-light text-gray-500">
              Copyright © 2013 - {new Date().getFullYear()}. Anibal Santos. All rights reserved.
            </span>
          </div>
        </Container>
      </footer>

      {process.env.NODE_ENV === "development" && (
        <RawRenderer rawData={rawData} />
      )}
    </>
  );
};
