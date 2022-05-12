import { useRouter } from "next/router";
import cn from "classnames";
import Link from "next/link";

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

export default NavItem;
