import dayjs from 'dayjs'
import { Fragment, type ReactNode } from 'react'
import PostViewCount from '~/components/posts/post-view-count'

const PostInfo: React.FC<{
  date: string
  tags: string[] | undefined
  views?: number
  viewCount?: ReactNode
  slug?: string
  incrementViews?: boolean
  hasViewed?: boolean
}> = ({ date, tags, views, viewCount, slug, incrementViews, hasViewed }) => {
  const shouldShowViews = viewCount !== undefined || typeof views === 'number'

  return (
    <div className="mt-3 flex flex-row flex-wrap items-center gap-x-3 gap-y-2 text-xs md:mt-4 md:gap-2.5 md:text-base">
      <div className="flex flex-row items-center gap-1.5">
        <div className="flex rounded-md bg-primary-light/45 p-1 text-primary-small">
          <span className="i-mingcute-calendar-line size-4 md:size-[1.125rem]" />
        </div>
        <h2 className="min-w-max font-semibold text-primary-dark">
          <time dateTime={date} suppressHydrationWarning>
            {dayjs(date).format('YYYY-MM-DD')}
          </time>
        </h2>
      </div>

      {shouldShowViews && (
        <div className="flex flex-row items-center gap-1.5">
          <div className="flex rounded-md bg-primary-light/45 p-1 text-primary-small">
            <span className="i-mingcute-eye-2-line size-4 md:size-[1.125rem]" />
          </div>
          <h2 className="min-w-max font-semibold text-primary-dark">
            {viewCount ?? (
              <PostViewCount
                slug={slug}
                views={views ?? 0}
                incrementViews={incrementViews}
                hasViewed={hasViewed}
              />
            )}
          </h2>
        </div>
      )}
      {tags && (
        <div className="flex min-w-0 flex-row items-center gap-1.5">
          <div className="flex rounded-md bg-primary-light/45 p-1 text-primary-small">
            <span className="i-mingcute-hashtag-line size-4 md:size-[1.125rem]" />
          </div>
          <div className="flex min-w-0 flex-row flex-wrap gap-1 font-semibold text-primary-dark">
            {tags.map((item, index) => (
              <Fragment key={item}>
                <span>{item}</span>
                <span>{index !== tags.length - 1 ? '/' : ''}</span>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostInfo
