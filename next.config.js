/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.weatherapi.com'], 
  },
  productionBrowserSourceMaps: false, 
}

module.exports = nextConfig