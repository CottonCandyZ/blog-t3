import type { NextConfig } from 'next'

const config: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  // serverExternalPackages: [],
  transpilePackages: ['next-mdx-remote', 'shiki'],
}

export default config
