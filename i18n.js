module.exports = {
  locales: ["en", "es"],
  defaultLocale: "en",
  localeDetection: false,
  pages: {
    "*": ["common"],
    "/": ["home"],
    "/blog": ["blog", "common"],
  },
};
