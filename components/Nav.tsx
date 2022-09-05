import SwitchLang from "./SwitchLang";
import Structure from "./Structure";
import useTranslation from "next-translate/useTranslation";
import { useCallback, useEffect, useState } from "react";
import NavItem from "./NavItem";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRef } from "react";

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

const Nav = () => {
  const menu = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useAutoClose({ setIsOpen, menu });
  const { t } = useTranslation("common");
  const links = [
    { name: t("routes.home.label"), to: "/" },
    { name: t("routes.series.label"), to: "/series" },
    { name: t("routes.about.label"), to: "/about" },
  ];
  const { locale } = useRouter();

  return (
    <>
      <Structure>
        <nav className="flex items-center justify-between w-full relative border-gray-200 mx-auto py-5 md:py-10 text-gray-900 bg-gray-50 bg-opacity-60">
          <button className="font-medium">
            <Link href="/" locale={locale}>
              anibal santos
            </Link>
          </button>
          <div className="inline-flex space-x-2 items-center">
            <div className="relative inline-block text-left" ref={menu}>
              <button
                type="button"
                id="menu-button"
                aria-expanded={isOpen}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsOpen((isOpen) => !isOpen);
                }}
                className="flex items-center"
              >
                {!isOpen && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 9h16.5m-16.5 6.75h16.5"
                    />
                  </svg>
                )}
                {isOpen && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
              {isOpen && (
                <div
                  className="absolute right-0 z-10 mt-4 w-24 p-2 origin-top-right rounded-md bg-gray-50 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-hidden={!isOpen}
                >
                  <ul className="space-y-2 flex flex-col w-full">
                    <SwitchLang />

                    {links.map(({ name, to }, index) => (
                      <NavItem text={name} href={to} key={index} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </Structure>
    </>
  );
};

export default Nav;
