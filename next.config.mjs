/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdni.iconscout.com',
      },
      {
        protocol: 'https',
        hostname: "herofreelancers-org.b-cdn.net",
      }
    ],
  },
};

export default nextConfig;