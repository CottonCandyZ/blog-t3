import glob from "fast-glob";
import fs from "fs/promises";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import path from "path";
import type { PostFrontmatter } from "~/components/posts";
import { bundleMDX } from "mdx-bundler";
import dayjs from "dayjs";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { cache } from "react";

/**
 * Get sorted and filtered posts info.
 * @returns Sorted by day and filtered `slug` and `frontmatter`.
 */
export const getLatestPostsListInfo = cache(async () => {
  const postsPathName = await getAllPostsPathName();
  const allPostsListInfo = await Promise.all(
    postsPathName.map(async (postPathName) => {
      const slug = getPostSlug(postPathName);
      const frontmatter = await getPostFrontmatter(slug);
      return {
        slug,
        frontmatter,
      };
    }),
  );
  return allPostsListInfo
    .filter(({ frontmatter }) => !frontmatter.draft)
    .sort((a, b) => {
      const dayA = dayjs(a.frontmatter.date).valueOf();
      const dayB = dayjs(b.frontmatter.date).valueOf();
      return dayB - dayA;
    });
});
/**
 * Get all tags appear in posts.
 * @returns All tags in posts.
 */
export const getAllTags = cache(async () => {
  const posts = await getLatestPostsListInfo();
  const oTags: string[][] = [];
  let uniqueTags = new Set<string>();

  posts.forEach((post) => {
    if (post.frontmatter.tags) oTags.push(post.frontmatter.tags);
    post.frontmatter.tags?.forEach((tag) => {
      uniqueTags.add(tag);
    });
  });
  uniqueTags = new Set([...uniqueTags].sort((a, b) => a.localeCompare(b)));
  return { uniqueTags: uniqueTags, oTags: oTags };
});

/**
 * Parse the post content by slug.
 * @param slug Post path name without `.mdx` suffix.
 * @returns `code` and `frontmatter` parsed by `bundleMDX`.
 */
export const getPostContent = cache(async (slug: string) => {
  const { code, frontmatter } = await bundleMDX<PostFrontmatter>({
    file: path.join(process.cwd(), `posts/${slug}.mdx`),
    cwd: path.join(process.cwd(), "./posts"),
    mdxOptions(options) {
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
  return { code, frontmatter };
});

/**
 * Get all posts path name under posts folder and subfolder.
 * Including the file with `.mdx` suffix.
 * Path name default contain the create date and title.
 * @returns Posts path name.
 */
async function getAllPostsPathName() {
  return await glob("posts/**/*.mdx");
}

/**
 * Remove `.mdx` suffix to get slug name.
 * @param postPathName Post path name.
 * @returns Post paths name with mdx suffix removed.
 */
function getPostSlug(postPathName: string) {
  return postPathName.replace(/^posts\/|\.mdx$/g, "");
}

export const getAllPostsSlug = cache(async () => {
  return (await getAllPostsPathName()).map((path) => getPostSlug(path));
});

/**
 * Extract frontmatter info.
 * @param slug Post path name without `.mdx` suffix.
 * @returns `PostFrontmatter`.
 */
export const getPostFrontmatter = cache(async (slug: string) => {
  const rawMdx = await fs.readFile(
    path.join(process.cwd(), `posts/${slug}.mdx`),
    "utf8",
  );
  const frontmatter = matter(rawMdx).data as PostFrontmatter;
  return frontmatter;
});
