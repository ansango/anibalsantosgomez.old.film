import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
const SwitchLang = () => {
  const { asPath, locale, locales } = useRouter();
  const { t } = useTranslation();

  const langsRoutes = locales
    ?.map((loc: string) => {
      return {
        route: asPath,
        loc,
        label: t(`common:langs.${loc}.value`),
      };
    })
    .filter(({ loc }) => loc !== locale);

  return (
    <button className="uppercase">
      {langsRoutes.map(({ route, loc, label }) => (
        <Link href={route} key={loc} locale={loc}>
          <a>{label}</a>
        </Link>
      ))}
    </button>
  );
};

export default SwitchLang;
