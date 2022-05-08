import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import useTranslation from "next-translate/useTranslation";
const SwitchLang = () => {
  const { asPath, locale, locales } = useRouter();
  const { t } = useTranslation();

  const langsRoutes = locales
    .map((loc: string) => {
      return {
        route: asPath,
        loc,
        label: t(`common:langs.${loc}.emoji`),
      };
    })
    .filter(({ loc }) => loc !== locale);

  return (
    <div>
      {langsRoutes.map(({ route, loc, label }) => (
        <Link href={route} key={loc} locale={loc}>
          <a>{label}</a>
        </Link>
      ))}
    </div>
  );
};

export default memo(SwitchLang);
