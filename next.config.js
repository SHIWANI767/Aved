const { i18n } = require("./next-i18next.config"); // Check the path here

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n, // Passing the i18n configuration
  env: {
    BASE_URL: process.env.BASE_URL,
    reCaptchaKey: process.env.reCaptchaKey,
  },
  devIndicators: {
    buildActivity: false,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // Optional webpack fallback for `fs` module
    return config;
  },
};

