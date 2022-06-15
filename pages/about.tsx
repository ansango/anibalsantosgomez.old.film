import Container from "components/Container";
import Structure from "components/Structure";
import { NextPage } from "next";
import Image from "next/image";
import avatar from "public/avatar.jpeg";
import seoConfig from "lib/seoConfig";
import useTranslation from "next-translate/useTranslation";

const About: NextPage = () => {
  const { t } = useTranslation("about");
  return (
    <Container>
      <Structure>
        <div className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 pb-16 space-y-5">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
            {t("title")}
          </h1>
          <div>
            <Image
              src={avatar}
              alt={seoConfig.author}
              className="w-full rounded-full"
              width={150}
              height={150}
            />
          </div>
          <p className="text-gray-600 dark:text-gray-400 lg:pr-40">{t("p1")}</p>
          <p className="text-gray-600 dark:text-gray-400 lg:pr-40">{t("p2")}</p>
          <p className="text-gray-600 dark:text-gray-400 lg:pr-40">{t("p3")}</p>
          <p className="text-gray-600 dark:text-gray-400 lg:pr-40">{t("p4")}</p>
          <p className="text-gray-600 dark:text-gray-400 lg:pr-40">{t("p5")}</p>
          <p className="text-gray-600 dark:text-gray-400 lg:pr-40">{t("p6")}</p>
          <p className="text-gray-600 dark:text-gray-400 lg:pr-40">{t("p7")}</p>
        </div>
      </Structure>
    </Container>
  );
};

export default About;
