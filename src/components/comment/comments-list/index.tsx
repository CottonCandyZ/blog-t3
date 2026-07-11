import CommentBlock from '~/components/comment/comments-list/comment-block'
import { fetchComments } from '~/server/fetch/comments-list'

const CommentsList: React.FC<{ slug: string }> = async ({ slug }) => {
  const result = await fetchComments(slug)
  if (!result.data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50/70 px-5 py-8 text-center text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/20 dark:text-red-300">
        <span className="icon-[mingcute--warning-fill] mb-2 block text-2xl" aria-hidden="true" />
        {result.message}
      </div>
    )
  }
  const comments = result.data
  return comments.length === 0 ? (
    <div className="rounded-2xl border border-dashed border-primary-light/80 bg-primary-extralight/30 px-5 py-10 text-center">
      <span
        className="icon-[mingcute--chat-3-line] mx-auto block text-4xl text-primary-light"
        aria-hidden="true"
      />
      <p className="mt-3 font-semibold text-primary-dark">这里还很安静</p>
      <p className="mt-1 text-sm text-primary-light">来成为第一个分享想法的人吧</p>
    </div>
  ) : (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-primary-dark">全部评论</h3>
        <span className="rounded-full bg-primary-extralight px-2 py-0.5 text-xs font-semibold tabular-nums text-primary">
          {comments.length}
        </span>
      </div>
      <ul className="w-full space-y-3">
        {comments.map((item) => (
          <li key={item.id}>
            <CommentBlock {...item} authorName={item.author.name} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommentsList
