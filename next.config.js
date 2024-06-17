/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["kollegeapply.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "**",
      },
    ],
  },
};

// const withPWA = require("next-pwa")({
//   dest: "public",
// });
// const dev = {
//   devtool: "source-map",
// };

// module.exports = withPWA(nextConfig, dev);
module.exports = nextConfig ;
