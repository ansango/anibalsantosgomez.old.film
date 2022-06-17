import Container from "components/Container";
import Structure from "components/Structure";
import { NextPage } from "next";
import seoConfig from "lib/utils/seoConfig";
import useTranslation from "next-translate/useTranslation";
import cover from "public/images/universidad.webp";

import Image from "next/image";
import ContactForm from "components/ContactForm";
const Contact: NextPage = () => {
  const { t } = useTranslation("contact");
  return (
    <Container
      SeoProps={{
        title: `${t("title")} - ${seoConfig.author}`,
        description: `${t("description")}`,
      }}
    >
      <Structure>
        <div className="flex flex-col justify-center items-start border-gray-200 dark:border-gray-700 pb-16 space-y-10">
          <div>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-gray-900 dark:text-gray-100">
              {t("title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-5">
              {t("description")}
            </p>
          </div>
          <div className="space-y-20">
            <div>
              <Image
                src={cover}
                alt="Anibal Santos"
                width={1152}
                height={768}
                priority
              />
            </div>
            <div className="w-full max-w-4xl space-y-10">
              <div>
                <h2 className="font-bold text-2xl md:text-3xl tracking-tight mb-1 text-gray-900 dark:text-gray-100">
                  {t("form.title")}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-5">
                  {t("form.description")}
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </Structure>
    </Container>
  );
};

export default Contact;
