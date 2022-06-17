import fetcher from "lib/utils/fetcher";

export const onPostContactForm = async ({
  contactForm,
}: {
  contactForm: {
    name: string;
    email: string;
    message: string;
  };
}) => {
  try {
    await fetcher("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactForm }),
    });
    return true;
  } catch (err: any) {
    throw err;
  }
};
