import Link from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";
import SwitchLang from "./SwitchLang";
import SwitchTheme from "./SwitchTheme";


const NavItem = ({ href, text }) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  return (
    <Link href={href}>
      <a
        className={cn(
          isActive
            ? "font-semibold text-gray-800 dark:text-gray-200"
            : "font-normal text-gray-600 dark:text-gray-400",
          "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </Link>
  );
};

const Nav = () => {
  return (
    <div className="flex flex-col justify-center px-8">
      <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
        <div className="ml-[-0.60rem]">
          {/* <MobileMenu /> */}
          <NavItem href="/" text="Home" />
          <NavItem href="/blog" text="Blog" />
        </div>
        <div className="flex items-center space-x-2">
          <SwitchLang />
          <SwitchTheme />
        </div>
      </nav>
    </div>
  );
};

export default Nav;
