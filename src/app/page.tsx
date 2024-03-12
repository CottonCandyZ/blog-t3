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
    <main className="relative mx-auto grid max-w-6xl min-h-screen grid-cols-[2fr_1fr] gap-10 px-5 pb-20 md:px-10">
      <TagsProvider>
        <section className="col-span-full md:col-span-1">
          <h2 className="text-xl font-medium tracking-widest text-primary">
            最新序
          </h2>
          <div className="h-10"></div>
          <div className="flex flex-col gap-8">
            <PostsList posts={latestPostsListInfo} />
          </div>
        </section>
        <section className="sticky top-24 col-auto hidden h-min md:col-span-1 md:block">
          <h2 className="text-xl font-medium tracking-widest text-primary">
            Tags (Click to filter)
          </h2>
          <div className="mt-3 h-min">
            <Tags uniqueTags={uniqueTags} oTags={oTags} />
          </div>
        </section>
      </TagsProvider>
    </main>
  );
}
