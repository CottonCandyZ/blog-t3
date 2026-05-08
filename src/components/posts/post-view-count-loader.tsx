import { cookies } from 'next/headers'
import PostViewCount from '~/components/posts/post-view-count'
import { POST_VIEW_VISITOR_COOKIE } from '~/lib/post-view-cookie'
import { getAllPostViewsMap, getPostViews, hasPostViewVisit } from '~/server/fetch/post-views'

const PostViewCountLoader: React.FC<{
  slug: string
  incrementViews?: boolean
  batchViews?: boolean
}> = async ({ slug, incrementViews = false, batchViews = false }) => {
  if (!incrementViews) {
    const views = batchViews
      ? ((await getAllPostViewsMap()).get(slug) ?? 0)
      : await getPostViews(slug)
    return <PostViewCount views={views} />
  }

  const visitorId = (await cookies()).get(POST_VIEW_VISITOR_COOKIE)?.value
  const [views, hasViewed] = await Promise.all([
    getPostViews(slug),
    visitorId ? hasPostViewVisit(slug, visitorId) : Promise.resolve(false),
  ])
  return <PostViewCount slug={slug} views={views} incrementViews hasViewed={hasViewed} />
}

export const PostViewCountSkeleton: React.FC = () => {
  return (
    <span className="inline-flex h-6 w-12 animate-pulse rounded-md bg-gray-200 align-middle">
      <span className="sr-only">Loading...</span>
    </span>
  )
}

export default PostViewCountLoader
