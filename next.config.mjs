/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Overridable so a production build can be verified without colliding with a
  // `next dev` server already writing to .next in the same checkout.
  distDir: process.env.NEXT_DIST_DIR || '.next',

  // Article images come from an upstream CMS and from Google's image cache.
  // next/image needs each host declared explicitly.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'api.carsnbike.com' },
      { protocol: 'https', hostname: 'carsnbike.com' },
      { protocol: 'https', hostname: '**.gstatic.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },

  // Strip the console noise from production bundles, but keep errors and
  // warnings so real failures still reach the browser console.
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  poweredByHeader: false,
  compress: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        // Fingerprinted build assets are safe to cache indefinitely.
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },

  async redirects() {
    return [
      // Routes that existed on the previous single-page build.
      { source: '/my-interests', destination: '/interests', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },
      { source: '/blog-single/:slug', destination: '/blog/:slug', permanent: true },
      // The previous build shipped three hand-maintained LLM summary files.
      // They are now one generated route.
      { source: '/llm.txt', destination: '/llms.txt', permanent: true },
      { source: '/llms-full.txt', destination: '/llms.txt', permanent: true },
    ]
  },
}

export default nextConfig
