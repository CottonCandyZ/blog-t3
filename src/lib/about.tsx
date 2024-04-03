import remarkGfm from "remark-gfm";
import path from "path";
import type { PostFrontmatter } from "~/components/posts";
import { bundleMDX } from "mdx-bundler";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

const cache = new Map<
  string,
  PostFrontmatter | string 
>();

export async function getAboutContent() {
  const cacheCodeKey = `post:code`;
  const cacheFrontmatterKey = `post:frontmatter`;
  if (cache.has(cacheCodeKey) && cache.has(cacheFrontmatterKey)) {
    return {
      code: cache.get(cacheCodeKey) as string,
      frontmatter: cache.get(cacheFrontmatterKey) as PostFrontmatter,
    };
  }
  const { code, frontmatter } = await bundleMDX<PostFrontmatter>({
    file: path.join(process.cwd(), `src/config/about.mdx`),
    cwd: path.join(process.cwd(), "./src/config"),
    mdxOptions(options) {
      // Fix: bundle-MDX type error
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkUnwrapImages,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypeMdxCodeProps, { tagName: "code" }],
      ];

      return options;
    },
  });
  cache.set(cacheCodeKey, code);
  cache.set(cacheFrontmatterKey, frontmatter);
  return { code, frontmatter };
}
