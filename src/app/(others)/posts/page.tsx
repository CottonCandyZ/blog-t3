import PostsList from "~/components/posts/posts-list";
import { getPostsListInfo } from "~/lib/posts";

export const metadata = {
  title: "文章",
  description: "文章",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  const postsListInfo = await getPostsListInfo();
  return (
    <div className="flex w-full max-w-4xl flex-col space-y-2 rounded-2xl bg-white p-2 shadow-2xl transition-all">
      <PostsList props={postsListInfo} />
    </div>
  );
}
