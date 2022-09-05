import SwitchLang from "./SwitchLang";
import Structure from "./Structure";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { useRouter } from "next/router";
import Link from "next/link";

const Nav = () => {
  const { t } = useTranslation("common");
  const links = [
    { name: t("routes.home.label"), to: "/" },
    { name: t("routes.series.label"), to: "/series" },
    { name: t("routes.about.label"), to: "/about" },
  ];
  const { asPath, locale } = useRouter();
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
          <nav className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto py-5 md:py-10 text-gray-900 bg-gray-50 dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
            <button className="font-medium">
              <Link href="/" locale={locale}>
                anibal santos
              </Link>
            </button>
            <div className="flex items-center">
              <button onClick={onToggleNav} className="cursor-pointer">
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
              </button>
            </div>
          </nav>
        )}

        {open && (
          <div className="relative">
            <div className="h-screen absolute w-full z-10 bg-gray-100 dark:bg-gray-900 top-0">
              <nav className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto py-5 md:py-10 text-gray-900 bg-gray-50 dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
                <div className="flex items-center">
                  <button className="font-medium">
                    <Link href="/" locale={locale}>
                      anibal santos
                    </Link>
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <SwitchLang />
                  <button onClick={onToggleNav} className="h-6 w-6">
                    {open && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
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
              </nav>
              <div className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto pb-8 sm:pb-10 text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
                <ul className="space-y-2 flex flex-col w-full">
                  {links.map(({ name, to }, index) => (
                    <NavItem text={name} href={to} key={index} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Structure>
    </>
  );
};

export default Nav;
