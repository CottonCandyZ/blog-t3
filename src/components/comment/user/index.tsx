import { cookies } from "next/headers";
import NewCommentForm from "~/components/comment/new-comment-form";
import AuthRegForm from "~/components/comment/user/auth/auth-reg-form";
import UserInfo from "~/components/comment/user/user-info";
import { fetchLoggedUserInfo } from "~/server/fetch/user";
import dynamic from "next/dynamic";
const DeviceList = dynamic(
  () => import("~/components/comment/user/device/device-list"),
  {
    loading: () => (
      <p className="text-base font-medium text-primary">正在加载设备...</p>
    ),
  },
);
const User: React.FC<{ slug: string }> = async ({ slug }) => {
  const sessionId = cookies().get("session-id")?.value;
  let userInfo = null;
  if (sessionId) {
    userInfo = (await fetchLoggedUserInfo(sessionId)).data;
  }
  return (
    <>
      <div>
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
    </>
  );
};

export default User;
