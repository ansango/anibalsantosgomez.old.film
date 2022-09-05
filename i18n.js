module.exports = {
  locales: ["en", "es"],
  defaultLocale: "en",
  localeDetection: false,
  pages: {
    "*": ["common"],
    "/": ["home"],
    "/about": ["about", "common"],
    "/contact": ["contact", "common"],
    "/series": ["series", "common"],
  },
};
