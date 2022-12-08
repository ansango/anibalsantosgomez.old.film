const withSvgr = require("next-svgr");

module.exports = withSvgr({
  images: {
    domains: ["asg-cms.s3.eu-west-3.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
});
