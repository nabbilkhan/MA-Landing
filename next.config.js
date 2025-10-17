/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export
  output: 'export',

  // Required for static export
  images: {
    unoptimized: true
  },

  // Add trailing slashes for better static hosting
  trailingSlash: true,

  // Strict mode for better development
  reactStrictMode: true,

  // Performance optimizations (removed swcMinify - not valid in Next.js 15)

  // Disable x-powered-by header
  poweredByHeader: false,
}

module.exports = nextConfig