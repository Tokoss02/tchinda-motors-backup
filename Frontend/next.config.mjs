

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '5000',
          pathname: '/uploads/**', // Allow any image under /uploads
        },
      ],
    },
  };
  
  export default nextConfig;

  
  