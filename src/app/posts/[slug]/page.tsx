import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostContent from '~/components/posts/post-content'
import { getAllPostsSlug, getPostFrontmatter } from '~/server/fetch/posts'

export async function generateStaticParams() {
  const postsSlug = await getAllPostsSlug()
  return postsSlug.map(postSlug => ({
    slug: postSlug,
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
  const postsSlug = await getAllPostsSlug()
  if (!postsSlug.includes(params.slug))
    notFound()
  return <PostContent slug={params.slug} />
}
