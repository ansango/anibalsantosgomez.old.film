import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "../util/container";
import { Icon } from "../util/icon";

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
      {nav.map((item, i) => {
        const activeItem =
          item.href === ""
            ? typeof location !== "undefined" && location.pathname == "/"
            : windowUrl.includes(item.href);
        return (
          <Link
            href={`${prefix}/${item.href}`}
            passHref
            key={`${item.label}-${i}`}
          >
            <a
              className={`px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline ${
                activeItem ? "text-blue-500" : ""
              }`}
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
  return (
    <Container>
      <div className="flex flex-col md:items-center md:justify-between md:flex-row">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          <Link href="/">
            <a className="text-lg font-bold tracking-tighter text-blue-600 transition duration-500 ease-in-out transform tracking-relaxed lg:pr-8">
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
                className="absolute right-5 z-10 mt-4 w-24 p-2 origin-top-right rounded-md bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none"
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

        <nav className="flex-col items-center flex-grow hidden pb-4 border-blue-600 md:pb-0 md:flex md:justify-end md:flex-row lg:border-l-2 lg:pl-2">
          {data.nav && <Nav nav={data.nav} />}
        </nav>
      </div>
    </Container>
  );
};
