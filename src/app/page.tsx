import Header from "~/components/header";
import PostsList from "~/components/posts/posts-list";
import { getLatestPostsListInfo } from "~/lib/posts";

export const metadata = {
  title: "棉花糖",
  description: "棉花糖的 Blog",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  const latestPostsListInfo = await getLatestPostsListInfo();
  return (
    <div>
      <div className="h-10 bg-primary-extralight hidden md:block"></div>
      <div className="sticky top-0 z-[5] mx-auto max-w-6xl px-5 py-3 md:px-10">
        <Header />
      </div>
      <div className="relative col-span-full h-36 bg-primary-extralight">
        <div className="absolute -top-[4rem] h-16 w-full bg-primary-extralight"></div>
        <div className="sticky top-0 z-[4] h-16 bg-primary-extralight"></div>
      </div>
      <div className="sticky top-0 z-[4] h-16 bg-white"></div>
      <main className="mx-auto grid max-w-6xl grid-cols-[2fr_1fr] gap-10 pb-20 px-5 md:px-10">
        <section className="col-span-full md:col-span-1">
          <h2 className="text-xl font-medium tracking-widest text-primary">
            最新序
          </h2>
          <div className="h-10"></div>
          <div className="flex flex-col gap-8">
            <PostsList props={latestPostsListInfo} />
          </div>
        </section>
        <section className="col-auto hidden md:col-span-1 md:block">
          <h2 className="text-xl font-medium tracking-widest text-primary">Tags</h2>
        </section>
      </main>
    </div>
  );
}
