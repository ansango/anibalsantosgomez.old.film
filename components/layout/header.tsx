import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "../util/container";
import { Icon } from "../util/icon";
import { useTheme } from "./theme";
import {
  monoTextColors,
  primaryBorderColors,
  primaryHoverBorderColors,
  primaryHoverTextColors,
  primaryTextColors,
} from "../styles";

const useAutoClose = ({ setIsOpen, menu }) => {
  const handleClosure = useCallback(
    (event) => !menu.current.contains(event.target) && setIsOpen(false),
    [setIsOpen, menu]
  );

  useEffect(() => {
    window.addEventListener("click", handleClosure);
    window.addEventListener("focusin", handleClosure);

    return () => {
      window.removeEventListener("click", handleClosure);
      window.removeEventListener("focusin", handleClosure);
    };
  }, [handleClosure, menu]);
};

const Nav = ({ nav }) => {
  const { color, mono } = useTheme();
  const [prefix, setPrefix] = useState("");
  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  });

  return (
    <>
      {nav.map((item, i) => {
        return (
          <Link
            href={`${prefix}/${item.href}`}
            passHref
            key={`${item.label}-${i}`}
          >
            <a
              className={`px-4 py-2 mt-2 text-sm md:mt-0 focus:outline-none focus:shadow-outline leading-[22px] ${monoTextColors[600][mono]} ${primaryHoverTextColors[color]} border-b-2 border-transparent ${primaryHoverBorderColors[color]}`}
            >
              {item.label}
            </a>
          </Link>
        );
      })}
    </>
  );
};

export const Header = ({ data }) => {
  const menu = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useAutoClose({ setIsOpen, menu });
  const { color } = useTheme();

  return (
    <Container>
      <div className="flex flex-col md:items-center md:justify-between md:flex-row">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          <Link href="/">
            <a
              className={`text-lg font-bold tracking-tight ${primaryTextColors[color]} transition duration-600 ease-in-out transform tracking-relaxed lg:pr-8`}
            >
              anibalsantos
            </a>
          </Link>
          <div ref={menu}>
            <button
              className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
              type="button"
              id="menu-button"
              aria-expanded={isOpen}
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen((isOpen) => !isOpen);
              }}
            >
              <Icon
                parentColor={data.color}
                data={{
                  name: !isOpen ? data.iconMenu.name : data.iconClose.name,
                  color: !isOpen ? data.iconMenu.color : data.iconClose.color,
                  size: !isOpen ? data.iconMenu.size : data.iconClose.size,
                }}
              />
            </button>
            {isOpen && (
              <div
                className="absolute right-5 z-10 mt-4 w-24 p-2 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-hidden={!isOpen}
              >
                <ul className="space-y-2 flex flex-col w-full">
                  {data.nav && <Nav nav={data.nav} />}
                </ul>
              </div>
            )}
          </div>
        </div>

        <nav
          className={`flex-col items-center flex-grow hidden pb-4 ${primaryBorderColors[color]} md:pb-0 md:flex md:justify-end md:flex-row lg:border-l-2 lg:pl-2`}
        >
          {data.nav && <Nav nav={data.nav} />}
        </nav>
      </div>
    </Container>
  );
};
