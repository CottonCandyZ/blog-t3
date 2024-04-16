import HomeList from "~/components/home-list";
import { getAllTags, getLatestPostsListInfo } from "~/server/fetch/posts";

export const metadata = {
  title: "棉花糖",
  description: "棉花糖的 Blog",
};
export default async function Page() {
  const latestPostsListInfo = await getLatestPostsListInfo();
  const { uniqueTags, oTags } = await getAllTags();
  return (
    <div className="relative grid auto-rows-max grid-cols-[2fr_1fr] gap-4">
      <HomeList
        latestPostsListInfo={latestPostsListInfo}
        uniqueTags={uniqueTags}
        oTags={oTags}
      />
    </div>
  );
}
