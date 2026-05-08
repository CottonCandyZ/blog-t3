import { Suspense } from 'react'
import ClientWrapper from '~/components/client-wrapper'
import PostsList from '~/components/posts/posts-list'
import PostViewCountLoader, {
  PostViewCountFallback,
} from '~/components/posts/post-view-count-loader'
import { getStaleAllPostViewsMap } from '~/server/fetch/post-views'
import { getAllTags, getLatestPostsFrontmatterListInfo } from '~/server/fetch/posts'

export const metadata = {
  title: {
    absolute: 'Cotton',
  },
  description: 'Cotton',
}
export default async function Page() {
  const [posts, staleViews, tags] = await Promise.all([
    getLatestPostsFrontmatterListInfo(),
    getStaleAllPostViewsMap(),
    getAllTags(),
  ])

  const latestPostsListInfo = posts.map((post) => ({
    ...post,
    viewCount: (
      <Suspense fallback={<PostViewCountFallback views={staleViews.get(post.slug)} />}>
        <PostViewCountLoader slug={post.slug} batchViews />
      </Suspense>
    ),
  }))

  return (
    <ClientWrapper showTags tags={tags}>
      <PostsList posts={latestPostsListInfo} />
    </ClientWrapper>
  )
}
