import PostsList from "~/components/posts/posts-list";
import { getLatestPostsListInfo } from "~/server/fetch/posts";

export const metadata = {
  title: "棉花糖",
  description: "棉花糖的 Blog",
};
export default async function Page() {
  const latestPostsListInfo = await getLatestPostsListInfo();
  return <PostsList posts={latestPostsListInfo} />;
}
