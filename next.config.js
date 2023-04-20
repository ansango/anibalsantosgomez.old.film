/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [`${process.env.NEXT_PUBLIC_BUCKET_URL.replace("https://", "")}`],
    formats: ["image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
      {
        source: "/",
        destination: "/index",
      },
    ];
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
