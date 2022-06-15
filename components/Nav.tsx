import SwitchLang from "./SwitchLang";
import SwitchTheme from "./SwitchTheme";
import Structure from "./Structure";
import NavItem from "./NavItem";
import useTranslation from "next-translate/useTranslation";

const Nav = () => {
  const { t } = useTranslation("common");
  const links = [
    { name: t("routes.home.label"), to: "/" },
    { name: t("routes.about.label"), to: "/about" },
  ];

  return (
    <Structure>
      <div className="relative">
        <nav className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16 text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
          <div className="md:ml-[-0.60rem]">
            {links.map(({ name, to }, index) => (
              <NavItem key={index} text={name} href={to} />
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <SwitchLang />
            <SwitchTheme />
          </div>
        </nav>
      </div>
    </Structure>
  );
};

export default Nav;
