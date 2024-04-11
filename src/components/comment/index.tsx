import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import AuthRegForm from "~/components/comment/user/auth/auth-reg-form";
import NewCommentForm from "~/components/comment/new-comment-form";
import UserInfo from "~/components/comment/user/user-info";
import { fetchLoggedUserInfo } from "~/server/fetch/user";
const CommentsList = dynamic(
  () => import("~/components/comment/comments-list"),
  {
    loading: () => (
      <p className="text-base font-medium text-primary">正在加载评论区...</p>
    ),
  },
);
const DeviceList = dynamic(
  () => import("~/components/comment/user/device/device-list"),
  {
    loading: () => (
      <p className="text-base font-medium text-primary">正在加载设备...</p>
    ),
  },
);

const Comments: React.FC<{ slug: string }> = async ({ slug }) => {
  const sessionId = cookies().get("session-id")?.value;
  let userInfo = null;
  if (sessionId) {
    userInfo = (await fetchLoggedUserInfo(sessionId)).data;
  }
  return (
    <div className="w-full">
      <h2 className="text- text-3xl font-semibold text-primary">Comments</h2>
      <div className="mt-3">
        {userInfo ? (
          <UserInfo user={userInfo}>
            <DeviceList />
          </UserInfo>
        ) : (
          <AuthRegForm />
        )}
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
