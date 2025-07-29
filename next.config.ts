import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'juicemonk.blob.core.windows.net',
        port: '',
        pathname: '/product-images/**',
      },
    ],
  },
};

export default nextConfig;
