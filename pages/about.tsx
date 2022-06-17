import Container from "components/Container";
import Structure from "components/Structure";
import { NextPage } from "next";
import Image from "next/image";
import avatar from "public/avatar.jpeg";
import seoConfig from "lib/seoConfig";
import useTranslation from "next-translate/useTranslation";

import img1 from "public/images/01.webp";
import img2 from "public/images/02.webp";
import img3 from "public/images/03.webp";
import img4 from "public/images/04.webp";
import img5 from "public/images/05.webp";
import img6 from "public/images/06.webp";

const gallery = [
  {
    src: img4,
    alt: "",
  },
  {
    src: img5,
    alt: "",
  },
  {
    src: img6,
    alt: "",
  },

  {
    src: img1,
    alt: "",
  },
  {
    src: img3,
    alt: "",
  },
  {
    src: img2,
    alt: "",
  },
];

const About: NextPage = () => {
  const { t } = useTranslation("about");
  return (
    <Container>
      <Structure>
        <div className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 pb-16 space-y-5">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-gray-900 dark:text-gray-100">
            {t("title")}
          </h1>
          <div className="grid gap-5 grid-cols-12">
            <div className="col-span-12 lg:col-span-3">
              <Image
                src={avatar}
                alt={seoConfig.author}
                width={200}
                height={200}
              />
            </div>
            <div className="col-span-12 lg:col-span-9 space-y-5">
              <p className="text-gray-600 dark:text-gray-400">
                {t("p1")} {t("p2")}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {t("p3")} {t("p4")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 md:gap-2 lg:gap-5 md:grid-cols-3 py-10">
            {gallery.map((item, index) => (
              <div key={index} className="flex">
                <Image src={item.src} alt={item.alt} className="w-full" />
              </div>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400">{t("p5")}</p>
          <p className="text-gray-600 dark:text-gray-400">{t("p6")}</p>
          <p className="text-gray-600 dark:text-gray-400">{t("p7")}</p>
        </div>
      </Structure>
    </Container>
  );
};

export default About;
