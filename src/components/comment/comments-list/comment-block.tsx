import TimeFromNow from '~/components/comment/comments-list/time-from-now'

interface CommentBlockProps {
  content: string
  authorName: string
  createAt: Date
}

const CommentBlock: React.FC<CommentBlockProps> = ({ content, authorName, createAt }) => {
  return (
    <div className="border-b border-primary-extralight p-2">
      <div>
        <span className="font-semibold">{authorName}</span> · <TimeFromNow time={createAt} />
      </div>
      <p className="mt-2">{content}</p>
    </div>
  )
}

export default CommentBlock
