import { Suspense } from 'react'
import PostsList from '~/components/posts/posts-list'
import PostViewCountLoader, {
  PostViewCountFallback,
} from '~/components/posts/post-view-count-loader'
import { getStaleAllPostViewsMap } from '~/server/fetch/post-views'
import { getLatestPostsFrontmatterListInfo } from '~/server/fetch/posts'

export const metadata = {
  title: '棉花糖',
  description: '棉花糖的 Blog',
}
export default async function Page() {
  const [posts, staleViews] = await Promise.all([
    getLatestPostsFrontmatterListInfo(),
    getStaleAllPostViewsMap(),
  ])

  const latestPostsListInfo = posts.map((post) => ({
    ...post,
    viewCount: (
      <Suspense fallback={<PostViewCountFallback views={staleViews.get(post.slug)} />}>
        <PostViewCountLoader slug={post.slug} batchViews />
      </Suspense>
    ),
  }))

  return <PostsList posts={latestPostsListInfo} />
}
