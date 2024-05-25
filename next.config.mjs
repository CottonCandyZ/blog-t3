/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    // just for vercel to work
    outputFileTracingIncludes: {
      '/about': ['./src/config/about.mdx'],
    },
  },
  transpilePackages: ['next-mdx-remote'],
}

export default config
