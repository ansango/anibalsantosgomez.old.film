import { fetcher } from "lib/utils";

export const onPostContactForm = async ({
  contactForm,
  lang,
  token,
}: {
  contactForm: {
    name: string;
    email: string;
    message: string;
  };
  lang: string;
  token: string;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await fetcher("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactForm, lang, token }),
    });
    return true;
  } catch (err: any) {
    throw err;
  }
};
