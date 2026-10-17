/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.tchindamotors.com',
        pathname: '/uploads/**',
      },

      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // allow all images
      },
    ],
  },
};

export default nextConfig;
