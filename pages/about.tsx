import Container from "components/Container";
import Structure from "components/Structure";
import { NextPage } from "next";
import Image from "next/image";
import avatar from "public/images/me.webp";
import seoConfig from "lib/utils/seoConfig";
import useTranslation from "next-translate/useTranslation";
import { filmCameras, filmEquipment, gallery } from "lib/utils/mocks/about";
import ContactForm from "components/ContactForm";

const About: NextPage = () => {
  const { t } = useTranslation("about");

  return (
    <Container
      SeoProps={{
        title: `${t("title")}`,
        description: `${t("description")}`,
      }}
    >
      <Structure>
        <div className="flex flex-col justify-center items-start border-gray-200 pb-16 space-y-10 lowercase">
          <div className="flex flex-col py-20 md:pt-[20rem] lg:pt-[30rem] xl:pt-[48rem] w-full">
            <h1 className="text-gray-900 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight">
              {t("title")}
            </h1>
          </div>

          <div className="grid grid-cols-12 gap-5 lg:gap-10 pb-5">
            <div className="col-span-12">
              <Image src={avatar} alt={seoConfig.author} />
            </div>
            {gallery.map((item, index) => (
              <div className="col-span-12 lg:col-span-4" key={index}>
                <Image className="col-span-12" src={item.src} alt={item.alt} />
              </div>
            ))}
          </div>

          <div className="space-y-5 pb-10 lg:pb-20">
            <p className="text-gray-600">{t("p1")}</p>
            <p className="text-gray-600">{t("p2")}</p>
            <p className="text-gray-600">{t("p3")}</p>
          </div>
          <div className="space-y-10 pb-10 lg:pb-20">
            <h2 className="font-medium text-2xl md:text-3xl tracking-tight mb-1 text-gray-900">
              {t("gear")}
            </h2>
            <article>
              <h3 className="font-medium text-xl md:text-2xl tracking-tight mb-1 text-gray-900">
                {t("filmCameras")}
              </h3>
              <ul className="space-y-1">
                {filmCameras.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3 className="font-medium text-xl md:text-2xl tracking-tight mb-1 text-gray-900">
                {t("filmDevelopingEquipment")}
              </h3>
              <ul className="space-y-1">
                {filmEquipment.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <div className="w-full max-w-4xl space-y-20 pb-10 lg:pb-20">
            <div>
              <h2 className="font-medium text-2xl md:text-3xl tracking-tight mb-1 text-gray-900">
                {t("form.title")}
              </h2>
              <p className="text-gray-600 mb-5">{t("form.description")}</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </Structure>
    </Container>
  );
};

export default About;
