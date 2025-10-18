/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for proper image serving
  output: 'export',

  // Required for Next.js Image optimization
  images: {
    unoptimized: true
  },

  // Add trailing slashes for better static hosting
  trailingSlash: true,

  // Strict mode for better development
  reactStrictMode: true,

  // Disable x-powered-by header
  poweredByHeader: false,
}

module.exports = nextConfig