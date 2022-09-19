export const formatFieldLabel = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const kebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");

export const kebabParser = (str) => {
  return str
    .replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}[]\\\/]/gi, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
};
