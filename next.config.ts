import type { NextConfig } from 'next'

const config: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  reactCompiler: true,
  // serverExternalPackages: [],
  transpilePackages: ['next-mdx-remote', 'shiki'],
}

export default config
