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

const cache = new Map<
  string,
  string[] | PostFrontmatter | string | Set<string> | string[][]
>();
/**
 * Get sorted and filtered posts info.
 * @returns Sorted by day and filtered `slug` and `frontmatter`.
 */
export async function getLatestPostsListInfo() {
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
}
/**
 * Get all tags appear in posts.
 * @returns All tags in posts.
 */
export async function getAllTags() {
  const cacheUniqueTagsKey = `post:uniqueTags`;
  const cacheOTagsKey = `post:oTags`;
  if (cache.has(cacheUniqueTagsKey) && cache.has(cacheOTagsKey)) {
    return {
      uniqueTags: cache.get(cacheUniqueTagsKey) as Set<string>,
      oTags: cache.get(cacheOTagsKey) as string[][],
    };
  }
  const posts = await getLatestPostsListInfo();
  const oTags: string[][] = [];
  const uniqueTags = new Set<string>();

  posts.forEach((post) => {
    if (post.frontmatter.tags) oTags.push(post.frontmatter.tags);
    post.frontmatter.tags?.forEach((tag) => {
      uniqueTags.add(tag);
    });
  });
  cache.set(cacheUniqueTagsKey, uniqueTags);
  cache.set(cacheOTagsKey, oTags);
  return { uniqueTags: uniqueTags, oTags: oTags };
}

/**
 * Parse the post content by slug.
 * @param slug Post path name without `.mdx` suffix.
 * @returns `code` and `frontmatter` parsed by `bundleMDX`.
 */
export async function getPostContent(slug: string) {
  const cacheCodeKey = `post:code:${slug}`;
  const cacheFrontmatterKey = `post:frontmatter:${slug}`;
  if (cache.has(cacheCodeKey) && cache.has(cacheFrontmatterKey)) {
    return {
      code: cache.get(cacheCodeKey) as string,
      frontmatter: cache.get(cacheFrontmatterKey) as PostFrontmatter,
    };
  }
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
  cache.set(cacheCodeKey, code);
  cache.set(cacheFrontmatterKey, frontmatter);
  return { code, frontmatter };
}

/**
 * Get all posts path name under posts folder and subfolder.
 * Including the file with `.mdx` suffix.
 * Path name default contain the create date and title.
 * @returns Posts path name.
 */
async function getAllPostsPathName() {
  const cacheKey = "posts";
  const postsPathName: string[] =
    (cache.get(cacheKey) as string[]) ?? (await glob("posts/**/*.mdx"));
  cache.set(cacheKey, postsPathName);
  return postsPathName;
}

/**
 * Remove `.mdx` suffix to get slug name.
 * @param postPathName Post path name.
 * @returns Post paths name with mdx suffix removed.
 */
function getPostSlug(postPathName: string) {
  return postPathName.replace(/^posts\/|\.mdx$/g, "");
}

export async function getAllPostsSlug() {
  return (await getAllPostsPathName()).map((path) => getPostSlug(path));
}

/**
 * Extract frontmatter info.
 * @param slug Post path name without `.mdx` suffix.
 * @returns `PostFrontmatter`.
 */
export async function getPostFrontmatter(
  slug: string,
): Promise<PostFrontmatter> {
  const cacheKey = `post:frontmatter:${slug}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as PostFrontmatter;
  }
  const rawMdx = await fs.readFile(
    path.join(process.cwd(), `posts/${slug}.mdx`),
    "utf8",
  );
  const frontmatter = matter(rawMdx).data as PostFrontmatter;
  cache.set(cacheKey, frontmatter);
  return frontmatter;
}
