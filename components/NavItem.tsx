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
          isActive ? "font-medium text-gray-800" : "font-normal text-gray-600"
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </Link>
  );
};

export default NavItem;
