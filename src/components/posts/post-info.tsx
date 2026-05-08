import dayjs from 'dayjs'
import { Fragment } from 'react'
import PostViewCount from '~/components/posts/post-view-count'

const PostInfo: React.FC<{
  date: string
  tags: string[] | undefined
  views?: number
  slug?: string
  incrementViews?: boolean
}> = ({ date, tags, views, slug, incrementViews }) => {
  return (
    <div className="mt-4 flex flex-row flex-wrap items-center gap-3">
      <div className="flex flex-row items-center gap-2">
        <div className="flex rounded-lg bg-primary-light/60 p-1.5 text-primary-small">
          <span className="i-mingcute-calendar-line size-6" />
        </div>
        <h2 className="min-w-max font-semibold text-primary-dark">
          <time dateTime={date} suppressHydrationWarning>
            {dayjs(date).format('YYYY-MM-DD')}
          </time>
        </h2>
      </div>

      {typeof views === 'number' && (
        <div className="flex flex-row items-center gap-2">
          <div className="flex rounded-lg bg-primary-light/60 p-1.5 text-primary-small">
            <span className="i-mingcute-eye-2-line size-6" />
          </div>
          <h2 className="min-w-max font-semibold text-primary-dark">
            <PostViewCount slug={slug} views={views} incrementViews={incrementViews} />
          </h2>
        </div>
      )}
      {tags && (
        <div className="flex flex-row items-center gap-2">
          <div className="flex rounded-lg bg-primary-light/60 p-1.5 text-primary-small">
            <span className="i-mingcute-hashtag-line size-6" />
          </div>
          <div className="flex min-w-max flex-row gap-1 font-semibold text-primary-dark">
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
