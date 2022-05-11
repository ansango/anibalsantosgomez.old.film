const { withContentlayer } = require("next-contentlayer");
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */

module.exports = withContentlayer({
  swcMinify: true,
  reactStrictMode: true,
  i18n,
});
