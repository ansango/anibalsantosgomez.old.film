import { useRef, useState } from "react";
import Link from "next/link";
import { Container, Icon, useTheme } from "components";

import {
  IconName,
  iconSizeClass,
  monoTextColors,
  primaryBorderColors,
  primaryHoverBorderColors,
  primaryHoverTextColors,
  primaryTextColors,
} from "constant/styles";
import { useAutoClose } from "lib/hooks";

export const Header = ({
  data,
}: {
  data: {
    iconMenu: {
      name: IconName;
      size: keyof typeof iconSizeClass;
    };
    iconClose: {
      name: IconName;
      size: keyof typeof iconSizeClass;
    };
    nav: {
      label: string;
      href: string;
    }[];
  };
}) => {
  const { color, mono } = useTheme();
  const menu = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useAutoClose({ setIsOpen, menu });

  return (
    <header>
      <Container className="pt-6 sm:py-12">
        <div className="flex flex-col md:items-center md:justify-between md:flex-row">
          <div className="flex flex-row items-center justify-between lg:justify-start">
            <Link
              href="/"
              className={`text-lg font-bold tracking-tight transition duration-600 ease-in-out transform tracking-relaxed lg:pr-8 ${primaryTextColors[color]}`}
            >
              anibalsantos
            </Link>
            <div ref={menu}>
              <button
                className={`rounded-lg md:hidden focus:outline-none focus:shadow-outline p-4`}
                type="button"
                id="menu-button"
                aria-expanded={isOpen}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsOpen((isOpen) => !isOpen);
                }}
              >
                <Icon
                  data={{
                    name: !isOpen ? data.iconMenu.name : data.iconClose.name,
                    size: !isOpen ? data.iconMenu.size : data.iconClose.size,
                  }}
                />
              </button>
              {isOpen && (
                <div
                  className="absolute right-8 sm:right-10 z-10 mt-4  p-2 origin-top-right rounded-md bg-neutral-100/20 dark:bg-neutral-800/30 ring-1 ring-neutral-700 dark:ring-neutral-500 ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-hidden={!isOpen}
                >
                  <ul className="space-y-2 flex flex-col w-full">
                    {data.nav.map((item, i) => {
                      return (
                        <Link
                          href={`/${item.href}`}
                          passHref
                          key={`${item.label}-${i}`}
                          className={`px-4 py-2 mt-2 text-sm md:mt-0 focus:outline-none focus:shadow-outline leading-[22px] border-b-2 border-transparent ${monoTextColors[600][mono]} ${primaryHoverTextColors[color]}`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <nav
            className={`flex-col items-center flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row lg:border-l-2 lg:pl-2 ${primaryBorderColors[color]}`}
          >
            {data.nav.map((item, i) => {
              return (
                <Link
                  href={`/${item.href}`}
                  passHref
                  key={`${item.label}-${i}`}
                  className={`px-4 py-2 mt-2 text-sm md:mt-0 focus:outline-none focus:shadow-outline leading-[22px] border-b-2 border-transparent ${monoTextColors[600][mono]} ${primaryHoverTextColors[color]} ${primaryHoverBorderColors[color]}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </Container>
    </header>
  );
};
