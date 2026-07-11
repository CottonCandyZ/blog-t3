import TimeFromNow from '~/components/comment/comments-list/time-from-now'

interface CommentBlockProps {
  content: string
  authorName: string
  createAt: Date
}

const CommentBlock: React.FC<CommentBlockProps> = ({ content, authorName, createAt }) => {
  const initial = Array.from(authorName.trim())[0]?.toLocaleUpperCase() ?? '访'

  return (
    <article className="group rounded-2xl border border-primary-extralight bg-primary-bg p-4 transition duration-200 hover:border-primary-light hover:shadow-sm sm:p-5">
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-extralight text-sm font-bold text-primary ring-1 ring-inset ring-primary-light/60"
          aria-hidden="true"
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="truncate font-semibold text-primary-dark">{authorName}</span>
            <span className="text-xs text-primary-light">
              <TimeFromNow time={createAt} />
            </span>
          </div>
          <p className="mt-2 whitespace-pre-wrap break-words text-[0.95rem] leading-7 text-primary-dark/90">
            {content}
          </p>
        </div>
      </div>
    </article>
  )
}

export default CommentBlock
