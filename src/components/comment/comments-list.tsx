import CommentBlock from "~/components/comment/comment-block";
import { getComments } from "~/lib/comments/comments";

const CommentsList: React.FC<{ slug: string }> = async ({ slug }) => {
  const comments = await getComments(slug);
  return comments.length == 0 ? (
    <p className="text-base font-medium text-primary">还没有评论哦...</p>
  ) : (
    <ul className="w-full">
      {comments.map((item) => (
        <li key={item.id}>
          <CommentBlock {...item} authorName={item.author.name}></CommentBlock>
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
