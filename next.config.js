/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone mode for server-side rendering
  output: 'standalone',

  // Required for Next.js Image optimization
  images: {
    unoptimized: true
  },

  // Strict mode for better development
  reactStrictMode: true,

  // Disable x-powered-by header
  poweredByHeader: false,
}

module.exports = nextConfig