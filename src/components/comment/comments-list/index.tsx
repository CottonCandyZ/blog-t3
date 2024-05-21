import CommentBlock from '~/components/comment/comments-list/comment-block'
import { fetchComments } from '~/server/fetch/comments-list'

const CommentsList: React.FC<{ slug: string }> = async ({ slug }) => {
  const result = await fetchComments(slug)
  if (!result.data) {
    return (
      <p className="text-base font-medium text-primary">{result.message}</p>
    )
  }
  const comments = result.data
  return comments.length === 0
    ? (
      <p className="text-base font-medium text-primary">还没有评论哦...</p>
      )
    : (
      <ul className="w-full">
        {comments.map(item => (
          <li key={item.id}>
            <CommentBlock {...item} authorName={item.author.name}></CommentBlock>
          </li>
        ))}
      </ul>
      )
}

export default CommentsList
