import PostsList from "~/components/posts/posts-list";
import TagsProvider from "~/components/posts/tag-provider";
import Tags from "~/components/posts/tags";
import { getAllTags, getLatestPostsListInfo } from "~/lib/posts";

export const metadata = {
  title: "棉花糖",
  description: "棉花糖的 Blog",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  const latestPostsListInfo = await getLatestPostsListInfo();
  const { uniqueTags, oTags } = await getAllTags();
  return (
    <div className="relative grid auto-rows-max grid-cols-[2fr_1fr] gap-10 ">
      <TagsProvider>
        <section className="col-span-full row-start-1 h-min md:sticky md:top-24 md:col-start-2 md:block">
          <search>
            <h2 className="text-xl font-medium tracking-widest text-primary">
              Tags (Click to filter)
            </h2>
            <div className="mt-3 h-min">
              <Tags uniqueTags={uniqueTags} oTags={oTags} />
            </div>
          </search>
        </section>
        <section className="col-span-full row-start-2 md:col-start-1 md:col-end-1 md:row-start-1">
          <h2 className="text-xl font-medium tracking-widest text-primary">
            最新序
          </h2>
          <div className="h-10"></div>
          <div className="flex flex-col gap-8">
            <PostsList posts={latestPostsListInfo} />
          </div>
        </section>
      </TagsProvider>
    </div>
  );
}
