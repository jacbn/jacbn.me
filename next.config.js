/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Rewrite everything else to use `pages/index`
      {
        source: '/about',
        destination: '/',
      },
      {
        source: '/contacts',
        destination: '/',
      },
    ];
  },
}

module.exports = nextConfig
