/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Needed to use inline svg in JSX/TSX
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: [
      "fizno.com",
      "i.ebayimg.com",
      "localhost",
      "digimonk.net",
      "bargainparts.wpengine.com",
      "https://fizno.com",
      "api.whizzlet.com",
    ],
  },
  experimental: {
    // Necessary to import @passes/api-client and @passes/shared-constants
    // https://github.com/vercel/next.js/issues/9474#issuecomment-810212174
    externalDir: true,
    webpackBuildWorker: true,
  },
};

module.exports = nextConfig;
