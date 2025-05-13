module.exports = {
  i18n: {
    locales: ["en", "ar"], // Supported languages
    defaultLocale: "en", // Default language
    localeDetection: true, // Automatic language detection
  },
  react: {
    useSuspense: false, // Set this to false if you're not using React Suspense
  },
  localePath: "./src/locales", // Custom folder path for translation files
};
