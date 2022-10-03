import { fetcher } from "../utils";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw err;
  }
};
