/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["dummyjson.com"],
  },
};

module.exports = nextConfig;
