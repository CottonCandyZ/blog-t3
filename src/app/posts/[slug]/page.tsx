import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostContent from '~/components/posts/post-content'
import {
  getLatestPostsFrontmatterListInfo,
  getPostFrontmatter,
  isPostFileNotFoundError,
} from '~/server/fetch/posts'
import '~/styles/markdown.scss'

export async function generateStaticParams() {
  const postsInfo = await getLatestPostsFrontmatterListInfo()
  return postsInfo.map((postInfo) => ({
    slug: postInfo.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  let frontmatter: Awaited<ReturnType<typeof getPostFrontmatter>>

  try {
    frontmatter = await getPostFrontmatter(decodedSlug)
  } catch (error) {
    if (isPostFileNotFoundError(error)) notFound()
    throw error
  }

  return {
    title: frontmatter.title,
  }
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <PostContent slug={slug} />
}
