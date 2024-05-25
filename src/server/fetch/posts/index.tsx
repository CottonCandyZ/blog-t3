import fs from 'node:fs/promises'
import process from 'node:process'
import path from 'node:path'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'
import glob from 'fast-glob'
import dayjs from 'dayjs'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import { cache } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import type { PostFrontmatter } from '~/components/posts'
import remarkImageInfo from '~/server/fetch/posts/custom-remark-plugin/remark-image-info'
import { components } from '~/components/posts/mdx-component'

/**
 * Extract frontmatter info.
 * @param slug Post path name without `.mdx` suffix.
 * @returns `PostFrontmatter`.
 */
export const getPostFrontmatter = cache(async (slug: string) => {
  const rawMdx = await fs.readFile(path.resolve(`posts/${slug}.mdx`), 'utf8')
  const frontmatter = matter(rawMdx).data as PostFrontmatter
  return frontmatter
})

export const getAllPostsSlug = cache(async () => {
  return (await getAllPostsPathName()).map((path) => getPostSlug(path))
})

/**
 * Get sorted and filtered posts info.
 * @returns Sorted by day and filtered `slug` and `frontmatter`.
 */
export const getLatestPostsListInfo = cache(async () => {
  const postsSlug = await getAllPostsSlug()
  const allPostsListInfo = await Promise.all(
    postsSlug.map(async (slug) => {
      const frontmatter = await getPostFrontmatter(slug)
      return {
        slug,
        frontmatter,
      }
    }),
  )
  return allPostsListInfo
    .filter(({ frontmatter }) => !frontmatter.draft)
    .sort((a, b) => {
      const dayA = dayjs(a.frontmatter.date).valueOf()
      const dayB = dayjs(b.frontmatter.date).valueOf()
      return dayB - dayA
    })
})

/**
 * Get all tags appear in posts.
 * @returns All tags in posts.
 */
export const getAllTags = cache(async () => {
  const posts = await getLatestPostsListInfo()
  const oTags: string[][] = []
  let uniqueTags = new Set<string>()

  posts.forEach((post) => {
    if (post.frontmatter.tags) oTags.push(post.frontmatter.tags)
    post.frontmatter.tags?.forEach((tag) => {
      uniqueTags.add(tag)
    })
  })
  uniqueTags = new Set([...uniqueTags].sort((a, b) => a.localeCompare(b)))
  return { uniqueTags, oTags }
})

/**
 * Parse the post content by path.
 * @param mdxPath Post path.
 * @returns `code` and `frontmatter` parsed by `bundleMDX`.
 */
export const getPostContent = cache(async (mdxPath: string) => {
  const source = await fs.readFile(path.resolve(mdxPath), 'utf8')

  const mdxSource = await compileMDX<PostFrontmatter>({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkUnwrapImages, remarkImageInfo],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypeMdxCodeProps, { tagName: 'code' }],
        ],
      },
      parseFrontmatter: true,
    },
  })
  return mdxSource
})

/**
 * Get all posts path name under posts folder and subfolder.
 * Including the file with `.mdx` suffix.
 * Path name default contain the create date and title.
 * @returns Posts path name.
 */
async function getAllPostsPathName() {
  return await glob('posts/**/*.mdx')
}

/**
 * Remove `.mdx` suffix to get slug name.
 * @param postPathName Post path name.
 * @returns Post paths name with mdx suffix removed.
 */
function getPostSlug(postPathName: string) {
  return postPathName.replace(/^posts\/|\.mdx$/g, '')
}
