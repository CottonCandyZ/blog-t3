"use client";
import clsx from "clsx";
import { useFormStatus } from "react-dom";
import { Logout } from "~/lib/comments/session-and-user";

function LogOutButton({
  Logout,
}: {
  Logout: (formData: FormData) => Promise<void>;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      formAction={Logout}
      disabled={pending}
      className={clsx(
        `block h-min shrink-0 rounded-md px-3.5 py-2.5 text-center text-base
    font-semibold text-primary shadow-sm 
    ring-1 ring-inset ring-primary-light 
    hover:bg-primary-extralight hover:shadow-inner
    focus-visible:outline focus-visible:outline-2 
    focus-visible:outline-offset-2 focus-visible:outline-primary-medium`,
        {
          "bg-primary-extralight shadow-inner": pending,
        },
      )}
    >
      登出
    </button>
  );
}
const UserInfo: React.FC<{ user: { id: number; name: string } }> = ({
  user,
}) => {
  return (
    <div>
      <div className="flex items-end justify-between gap-2 flex-wrap">
        <div>
          <span className="text-pretty text-2xl text-primary-dark">Hi! </span>
          <span className="text-2xl font-medium text-primary">{user.name}</span>
          <span className="text-sm text-primary-light"> #{user.id}</span>
        </div>
        <div className="flex gap-2">
          <form>
            <LogOutButton Logout={Logout} />
          </form>
          {/* <button
            className="block h-min shrink-0 rounded-md px-3.5 py-2.5 text-center text-base
    font-semibold text-primary shadow-sm 
    ring-1 ring-inset ring-primary-light 
    hover:bg-primary-extralight hover:shadow-inner
    focus-visible:outline focus-visible:outline-2 
    focus-visible:outline-offset-2 focus-visible:outline-primary-medium"
          >
            设备管理
          </button> */}
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
