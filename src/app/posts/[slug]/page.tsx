import type { Metadata } from 'next'
import PostContent from '~/components/posts/post-content'
import { getLatestPostsListInfo, getPostFrontmatter } from '~/server/fetch/posts'
import '~/styles/markdown.scss'

export const dynamicParams = false

export async function generateStaticParams() {
  const postsInfo = await getLatestPostsListInfo()
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
  const frontmatter = await getPostFrontmatter(decodeURIComponent(slug))
  return {
    title: frontmatter.title,
  }
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <PostContent slug={slug} />
}
