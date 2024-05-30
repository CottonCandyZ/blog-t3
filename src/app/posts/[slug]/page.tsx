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
  params: { slug: string }
}): Promise<Metadata> {
  const frontmatter = await getPostFrontmatter(decodeURIComponent(params.slug))
  return {
    title: frontmatter.title,
  }
}
export default async function Page({ params }: { params: { slug: string } }) {
  return <PostContent slug={params.slug} />
}
