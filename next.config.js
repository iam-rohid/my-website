const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pbs.twimg.com", "images.unsplash.com", "cdn.hashnode.com"],
  },
};

module.exports = withContentlayer(nextConfig);
