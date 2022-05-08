import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

const SwitchLang = () => {
  const { asPath, locale, locales } = useRouter();
  const langsRoutes = locales
    .map((loc: string) => {
      return {
        route: asPath,
        loc,
      };
    })
    .filter(({ loc }) => loc !== locale);

  return (
    <div>
      {langsRoutes.map(({ route, loc }) => (
        <Link href={route} key={loc} locale={loc}>
          <a>{loc}</a>
        </Link>
      ))}
    </div>
  );
};

export default memo(SwitchLang);
