/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "en.gravatar.com",
      "lh3.googleusercontent.com"
    ]
  }
};

module.exports = nextConfig;
