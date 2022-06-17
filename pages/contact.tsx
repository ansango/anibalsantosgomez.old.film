import Container from "components/Container";
import Structure from "components/Structure";
import { NextPage } from "next";
import seoConfig from "lib/seoConfig";
import useTranslation from "next-translate/useTranslation";
import cover from "public/images/universidad.webp";

import Image from "next/image";
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
              <form className="grid gap-10 grid-cols-12">
                <label className="block col-span-12 md:col-span-6">
                  <input
                    type="text"
                    className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    bg-gray-100 dark:bg-gray-800
                    border-0 border-b-2 border-gray-200 dark:border-gray-500
                    focus:ring-0 focus:border-gray-900 dark:focus:border-gray-100
                  "
                    placeholder={t("form.fields.name.placeholder")}
                  />
                </label>
                <label className="block col-span-12 md:col-span-6">
                  <input
                    type="email"
                    className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    bg-gray-100 dark:bg-gray-800
                    border-0 border-b-2 border-gray-200 dark:border-gray-500
                    focus:ring-0 focus:border-gray-900 dark:focus:border-gray-100
                  "
                    placeholder={t("form.fields.email.placeholder")}
                  />
                </label>
                <label className="block col-span-12">
                  <textarea
                    className="
                    mt-0
                    block
                    w-full
                    px-0.5
                    bg-gray-100 dark:bg-gray-800
                    border-0 border-b-2 border-gray-200 dark:border-gray-500
                    focus:ring-0 focus:border-gray-900 dark:focus:border-gray-100
                  "
                    placeholder={t("form.fields.message.placeholder")}
                    rows={4}
                  ></textarea>
                </label>
              </form>
              <button className="bg-gray-200 dark:bg-gray-800 hover:font-medium transition-all py-4 px-4 md:py-2 w-full md:w-auto">
                {t("form.submit")}
              </button>
            </div>
          </div>
        </div>
      </Structure>
    </Container>
  );
};

export default Contact;
