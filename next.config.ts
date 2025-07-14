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
    // Для локальних зображень з папки /public додаткова конфігурація не потрібна.
    // Next.js обробляє їх автоматично.
  },
};

export default nextConfig;
