import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const SwitchLang = () => {
  const { asPath, locale } = useRouter();
  const { t } = useTranslation();
  const newLocale = locale === "en" ? "es" : "en";
  console.log("asPath", asPath);
  console.log("locale", locale);
  console.log("newLocale", newLocale);
  return (
    <button className="uppercase">
      <Link href={asPath} locale={newLocale}>
        <a>{t(`common:langs.${newLocale}.value`)}</a>
      </Link>
    </button>
  );
};

export default SwitchLang;
