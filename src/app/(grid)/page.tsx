import { Suspense } from 'react'
import PostsList from '~/components/posts/posts-list'
import PostViewCountLoader, {
  PostViewCountSkeleton,
} from '~/components/posts/post-view-count-loader'
import { getLatestPostsFrontmatterListInfo } from '~/server/fetch/posts'

export const metadata = {
  title: '棉花糖',
  description: '棉花糖的 Blog',
}
export default async function Page() {
  const latestPostsListInfo = (await getLatestPostsFrontmatterListInfo()).map((post) => ({
    ...post,
    viewCount: (
      <Suspense fallback={<PostViewCountSkeleton />}>
        <PostViewCountLoader slug={post.slug} batchViews />
      </Suspense>
    ),
  }))

  return <PostsList posts={latestPostsListInfo} />
}
