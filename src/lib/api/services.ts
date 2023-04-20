import type { ValidationSchema } from "@/components/cms";

import { fetcher } from ".";

export const onPostContactForm = async (schema: ValidationSchema) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await fetcher("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schema),
    });
    return true;
  } catch (err: unknown) {
    throw err;
  }
};
