/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
      {
        source: '/contacts',
        destination: '/',
      },
      {
        source: '/maths-art/:path*',
        destination: '/maths-art',
      },
    ];
  },
}

module.exports = nextConfig
