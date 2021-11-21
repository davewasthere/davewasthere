/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
    /* config options here */
    // i18n: {
    //     locales: ["en"],
    //     defaultLocale: "en",
    //   },
    images: {
      loader: "imgix",
      path: "",
    }
  }
  
  module.exports = nextConfig