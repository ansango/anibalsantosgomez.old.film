const { withContentlayer } = require("next-contentlayer");
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */

module.exports = withContentlayer({
  swcMinify: true,
  reactStrictMode: true,
  i18n,
  // webpack: (config, { dev, isServer }) => {
  //   if (!dev && !isServer) {
  //     Object.assign(config.resolve.alias, {
  //       "react/jsx-runtime.js": "preact/compat/jsx-runtime",
  //       react: "preact/compat",
  //       "react-dom/test-utils": "preact/test-utils",
  //       "react-dom": "preact/compat",
  //     });
  //   }

  //   return config;
  // },
});
