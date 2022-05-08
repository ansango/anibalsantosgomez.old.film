const { withContentlayer } = require("next-contentlayer");
const nextTranslate = require("next-translate");
/** @type {import('next').NextConfig} */

const config = nextTranslate({
  swcMinify: true,
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }

    return config;
  },
});

module.exports = withContentlayer(config);
