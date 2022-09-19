import React from "react";
import Link from "next/link";
import { Container } from "../util/container";
import { useTheme } from ".";
import { Icon } from "../util/icon";

const headerColor = {
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

const activeItemClasses = {
  blue: "border-b-3 border-blue-200 dark:border-blue-700",
  teal: "border-b-3 border-teal-200 dark:border-teal-700",
  green: "border-b-3 border-green-200 dark:border-green-700",
  red: "border-b-3 border-red-300 dark:border-red-700",
  pink: "border-b-3 border-pink-200 dark:border-pink-700",
  purple: "border-b-3 border-purple-200 dark:border-purple-700",
  orange: "border-b-3 border-orange-200 dark:border-orange-700",
  yellow: "border-b-3 border-yellow-300 dark:border-yellow-600",
};

export const Header = ({ data }) => {
  const { color, mono } = useTheme();

  const headerColorCss =
    data.color === "primary"
      ? headerColor.primary[color]
      : headerColor.mono[mono];

  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");
  const [windowUrl, setUrl] = React.useState("");
  const isBrowser = typeof window !== "undefined";
  const hasUrl = isBrowser ? window.location.href : "";

  React.useEffect(() => {
    setUrl(hasUrl);
  }, [hasUrl]);

  React.useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  });

  return (
    <>
      <div className={headerColorCss}>
        <Container size="custom" className="py-0 relative z-10 max-w-8xl">
          <div className="flex items-center justify-between">
            <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
              <Link href="/" passHref>
                <a className="flex items-center">
                  <Icon
                    parentColor={data.color}
                    data={{
                      name: data.icon.name,
                      color: data.icon.color,
                      size: data.icon.size,
                    }}
                    className="inline-block h-auto w-10 mr-1"
                  />{" "}
                  anibal santos
                </a>
              </Link>
            </h4>
            <ul className="flex gap-6 sm:gap-8 lg:gap-10">
              {data.nav &&
                data.nav.map((item, i) => {
                  const activeItem =
                    item.href === ""
                      ? typeof location !== "undefined" &&
                        location.pathname == "/"
                      : windowUrl.includes(item.href);
                  return (
                    <li
                      key={`${item.label}-${i}`}
                      className={activeItem ? activeItemClasses[color] : ""}
                    >
                      <Link href={`${prefix}/${item.href}`} passHref>
                        <a className="select-none	text-base inline-block tracking-wide font-regular transition duration-150 ease-out opacity-70 hover:opacity-100 py-8">
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </Container>
      </div>
    </>
  );
};
