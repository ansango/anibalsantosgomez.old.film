import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const SwitchLang = () => {
  const { locales, asPath, locale: currentLocale } = useRouter();
  const { t } = useTranslation();

  return (
    <>
      {locales.map((locale) => {
        const cn = locale === currentLocale ? "text-blue-500" : "";

        return (
          <Link href={"/"} key={locale} locale={locale}>
            <a className={cn}>{locale}</a>
          </Link>
        );
      })}
    </>
  );
};

export default SwitchLang;
