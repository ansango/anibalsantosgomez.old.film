import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import ExternalLink from "./ExternalLink";
import Structure from "./Structure";

const Footer = () => {
  const { t } = useTranslation("common");

  const links = [
    { name: t("routes.home.label"), to: "/" },
    { name: t("routes.about.label"), to: "/about" },
  ];
  return (
    <Structure>
      <footer className="flex flex-col justify-center items-start w-full mb-8">
        <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />

        <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
          <div className="flex flex-col space-y-4">
            {links.map(({ name, to }, index) => (
              <Link href={to} key={index}>
                <a className="text-gray-500 hover:text-gray-600 transition">
                  {name}
                </a>
              </Link>
            ))}
            <ExternalLink href="https://instagram.com/iamasync">
              instagram
            </ExternalLink>
          </div>
          <div className="flex flex-col space-y-4"></div>
        </div>
      </footer>
    </Structure>
  );
};

export default Footer;
