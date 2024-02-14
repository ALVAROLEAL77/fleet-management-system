/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  node: {
    fs: "empty",
  },
};

module.exports = nextConfig;
