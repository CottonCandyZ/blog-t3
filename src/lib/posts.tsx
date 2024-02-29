import glob from "fast-glob";
import fs from "fs/promises";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import path from "path";
import type { PostFrontmatter } from "~/components/posts";
import { bundleMDX } from "mdx-bundler";
import dayjs from "dayjs";

const cache = new Map<string, string[] | PostFrontmatter>();

export async function getPostsListInfo() {
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
      return dayA - dayB;
    });
}

export async function getPostContent(slug: string) {
  const { code, frontmatter } = await bundleMDX<PostFrontmatter>({
    file: path.join(process.cwd(), `posts/${slug}.mdx`),
    cwd: path.join(process.cwd(), "./posts"),
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      return options;
    },
  });
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

async function getPostFrontmatter(slug: string): Promise<PostFrontmatter> {
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
