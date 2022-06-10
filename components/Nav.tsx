import SwitchLang from "./SwitchLang";
import SwitchTheme from "./SwitchTheme";
import Link from "next/link";
import { useState } from "react";
import Structure from "./Structure";
import NavItem from "./NavItem";
import useTranslation from "next-translate/useTranslation";

const Nav = () => {
  const { t } = useTranslation("common");
  const links = [
    { name: t("routes.home.label"), to: "/" },
    { name: t("routes.about.label"), to: "/about" },
  ];
  const [open, toggle] = useState(false);

  return (
    <Structure>
      <div className="relative">
        <nav className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16 text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
          <div className="flex items-center md:hidden">
            <button onClick={() => toggle(!open)} className="h-6 w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M4 16h16"
                />
              </svg>
            </button>
          </div>
          <div className="md:block ml-[-0.60rem]">
            {links.map(({ name, to }, index) => (
              <NavItem key={index} text={name} href={to} />
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <SwitchLang />
            <SwitchTheme />
          </div>
        </nav>
        {open && (
          <div className="h-screen absolute w-full z-10 bg-gray-100 dark:bg-gray-900 top-0">
            <nav className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16 text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
              <div className="flex items-center">
                <button onClick={() => toggle(!open)} className="h-6 w-6">
                  {open && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <SwitchLang />
                <SwitchTheme />
              </div>
            </nav>
            <div className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto pb-8 sm:pb-16 text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
              <ul className="space-y-2 flex flex-col w-full">
                {links.map(({ name, to }, index) => (
                  <Link
                    href={to}
                    key={index}
                    passHref
                    onClick={() => toggle(!open)}
                  >
                    <a className="py-3 border-b border-gray-200 dark:border-b-gray-800 hover:font-semibold">
                      {name}
                    </a>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Structure>
  );
};

export default Nav;
