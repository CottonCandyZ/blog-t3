import glob from "fast-glob";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
import { type PostsFrontmatter } from "~/components/posts/type";
import dayjs from "dayjs";
const cache = new Map<string, string[] | PostsFrontmatter>();

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

export async function getAllPostsPathName() {
  const cacheKey = "posts";
  const postsPathName: string[] =
    (cache.get(cacheKey) as string[]) ?? (await glob("posts/**/*.mdx"));
  cache.set(cacheKey, postsPathName);
  return postsPathName;
}

export function getPostSlug(postPathName: string) {
  return postPathName.replace(/^posts\/|\.mdx$/g, "");
}

export async function getPostFrontmatter(
  slug: string,
): Promise<PostsFrontmatter> {
  const cacheKey = `post:frontmatter:${slug}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as PostsFrontmatter;
  }
  const rawMdx = await fs.readFile(
    path.join(process.cwd(), `posts/${slug}.mdx`),
    "utf8",
  );
  const frontmatter = matter(rawMdx).data as PostsFrontmatter;
  cache.set(cacheKey, frontmatter);
  return frontmatter;
}
