import remarkGfm from "remark-gfm";
import path from "path";
import type { PostFrontmatter } from "~/components/posts";
import { bundleMDX } from "mdx-bundler";
import type { Options } from "@mdx-js/esbuild/lib";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";


export async function getAboutContent() {
  const { code, frontmatter } = await bundleMDX<PostFrontmatter>({
    file: path.join(process.cwd(), `posts/about/about.mdx`),
    cwd: path.join(process.cwd(), "./posts/about"),
    mdxOptions(options) {
      // Fix: bundle-MDX type error
      const typedOptions = options as Options;
      typedOptions.remarkPlugins = [
        ...(typedOptions.remarkPlugins ?? []),
        remarkGfm,
        remarkUnwrapImages,
      ];
      typedOptions.rehypePlugins = [
        ...(typedOptions.rehypePlugins ?? []),
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypeMdxCodeProps, { tagName: "code" }],
      ];

      return typedOptions;
    },
  });
  return { code, frontmatter };
}
