const { withContentlayer } = require("next-contentlayer");
const nextTranslate = require("next-translate");
/** @type {import('next').NextConfig} */

module.exports = withContentlayer(
  nextTranslate({
    swcMinify: true,
    reactStrictMode: true,
    webpack: (config) => {
      return config;
    },
  })
);
