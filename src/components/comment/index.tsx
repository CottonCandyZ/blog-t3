import dynamic from "next/dynamic";
import AuthRegForm from "~/components/comment/auth-reg-form";
import NewCommentForm from "~/components/comment/new-comment-form";
import UserInfo from "~/components/comment/user-info";
import { getLoggedInUserInfo } from "~/lib/comments/session-and-user";
const CommentsList = dynamic(
  () => import("~/components/comment/comments-list"),
  {
    loading: () => (
      <p className="text-base font-medium text-primary">正在加载评论区...</p>
    ),
  },
);

const Comments: React.FC<{ slug: string }> = async ({ slug }) => {
  const userInfo = await getLoggedInUserInfo();
  return (
    <div className="w-full">
      <h2 className="text- text-3xl font-semibold text-primary">Comments</h2>
      <div className="mt-3">
        {userInfo ? <UserInfo {...userInfo} /> : <AuthRegForm />}
      </div>
      <div className="mt-5">
        {userInfo ? <NewCommentForm slug={slug} /> : null}
      </div>
      <div className="mt-10 flex items-center justify-center">
        <CommentsList slug={slug} />
      </div>
    </div>
  );
};

export default Comments;
