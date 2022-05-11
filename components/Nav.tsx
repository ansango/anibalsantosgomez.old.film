import SwitchLang from "./SwitchLang";
import SwitchTheme from "./SwitchTheme";
import Link from "next/link";
import { useState } from "react";

const links = [
  { name: "Home", to: "/", id: 1 },
  { name: "Blog", to: "/blog", id: 3 },
  { name: "About", to: "#", id: 2 },
];

const Nav = () => {
  const [open, toggle] = useState(false);

  return (
    <div className="flex flex-col justify-center px-8">
      <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
        <div className="flex items-center">
          <button onClick={() => toggle(!open)} className="h-6 w-6">
            {!open && (
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
            )}
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

        {open && (
          <div className="h-full absolute mt-60 w-full">
            <div className="space-y-2 flex flex-col">
              {links.map(({ name, to, id }) => (
                <Link href={to} key={id} passHref>
                  <a className="bg-gray-100 dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-md hover:scale-025 transition-all duration-200">
                    <a>{name}</a>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
