export const formatFieldLabel = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const kebabCase = (str) =>
  // remove title case
  str &&
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");

export const kebabParser = (str) => {
  return str
    .replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}[]\\\/]/gi, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
};

export const formatDate = (date, locale = "es-ES") => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const now = new Date(date).toLocaleDateString(locale, options);

  return now;
};

export type ErrorFetcher = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  message: string;
};

export const fetcher = async (
  ...args: Parameters<typeof fetch>
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<any | Error> => {
  return fetch(...args)
    .then()
    .then((response) => {
      if (response.status === 204) {
        return Promise.resolve();
      } else if (!response.ok) {
        return Promise.reject({
          message: response.statusText,
          error: response.status,
        });
      }
      return response.json();
    })
    .catch((error) => Promise.reject(error));
};
export default fetcher;
