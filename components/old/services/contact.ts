import fetcher from "lib/utils/fetcher";

export const onPostContactForm = async ({
  contactForm,
  lang,
}: {
  contactForm: {
    name: string;
    email: string;
    message: string;
  };
  lang: string;
}) => {
  try {
    await fetcher("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactForm, lang }),
    });
    return true;
  } catch (err: any) {
    throw err;
  }
};
