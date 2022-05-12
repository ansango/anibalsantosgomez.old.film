module.exports = {
  locales: ["en", "es"],
  defaultLocale: "en",
  localeDetection: false,
  pages: {
    "*": ["common"],
    "/blog": ["blog", "common"],
  },
};
