import SwitchLang from "./SwitchLang";
import SwitchTheme from "./SwitchTheme";
import Structure from "./Structure";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import seoConfig from "lib/seoConfig";
import Searcher from "./Searcher";
import NavItem from "./NavItem";
import { useRouter } from "next/router";
import Link from "next/link";

const Nav = () => {
  const { t } = useTranslation("common");
  const links = [
    { name: t("routes.home.label"), to: "/" },
    { name: t("routes.about.label"), to: "/about" },
    { name: t("routes.contact.label"), to: "/contact" },
  ];
  const { asPath, locale } = useRouter();
  const isHome = asPath === "/";
  const [open, toggle] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "auto";
    toggle(false);
  }, [asPath]);


  const onToggleNav = () => {
    toggle((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };
  return (
    <>
      <Structure>
        {!open && (
          <nav className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto pt-4 pb-8 sm:pt-8 sm:pb-16 text-gray-900 bg-gray-50 dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
            <div className="flex items-center">
              <button onClick={onToggleNav} className="h-6 w-6">
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
            {!isHome && (
              <Link href="/" locale={locale}>
                <a className="font-medium sm:text-lg hover:underline">
                  {seoConfig.author}
                </a>
              </Link>
            )}
          </nav>
        )}

        {open && (
          <div className="relative">
            <div className="h-screen absolute w-full z-10 bg-gray-100 dark:bg-gray-900 top-0">
              <nav className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto pt-4 pb-8 sm:pt-8 sm:pb-16 text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
                <div className="flex items-center">
                  <button onClick={onToggleNav} className="h-6 w-6">
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
                <Link href="/" locale={locale}>
                  <a className="font-medium sm:text-lg hover:underline">
                    {seoConfig.author}
                  </a>
                </Link>
                <div className="flex items-center space-x-2">
                  <SwitchLang />
                  <SwitchTheme />
                </div>
              </nav>
              <div className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto pb-8 sm:pb-10 text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
                <ul className="space-y-2 flex flex-col w-full">
                  {links.map(({ name, to }, index) => (
                    <NavItem text={name} href={to} key={index} />
                  ))}
                </ul>
              </div>
              <Searcher />
            </div>
          </div>
        )}
      </Structure>
    </>
  );
};

export default Nav;
