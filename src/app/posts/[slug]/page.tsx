import Header from "~/components/header";
import PostContent from "~/components/posts/mdx-component";
import { getPostContent } from "~/lib/posts";
import type { Metadata } from "next";
import TableOfContents from "~/components/posts/table-of-contents";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // read route params
  const { code, frontmatter } = await getPostContent(
    decodeURIComponent(params.slug),
  );

  return {
    title: frontmatter.title,
  };
}
export default async function Page({ params }: { params: { slug: string } }) {
  const { code, frontmatter } = await getPostContent(
    decodeURIComponent(params.slug),
  );
  return (
    <div>
      <div className="sticky top-0 z-[5] mx-auto max-w-6xl px-5 py-3 md:px-10">
        <Header />
      </div>
      <div className="relative col-span-full h-64 bg-primary-extralight">
        <div className="absolute -top-[4rem] h-16 w-full bg-primary-extralight"></div>
        <div className="sticky top-0 z-[4] h-16 bg-primary-extralight"></div>
        <h1 className="relative z-[2] mx-auto mt-10 max-w-6xl px-5 text-4xl font-bold text-primary md:px-10">
          {frontmatter.title}
        </h1>
      </div>
      <div className="sticky top-0 z-[4] h-16 bg-white"></div>
      <div className="mx-auto flex max-w-6xl flex-row justify-center gap-10 px-5 py-10 md:px-10 lg:justify-normal">
        <article className="markdown-body w-full max-w-2xl relative">
          <h2 className="anchor absolute -top-6 invisible" id="Introduction">简介</h2>
          <PostContent code={code} />
        </article>
        <aside className="sticky top-28 hidden max-h-[calc(-112px+100vh)] basis-1/3 overflow-auto p-2 lg:block lg:gap-4">
          <nav className="flex flex-col gap-2">
            <h2 className="text-2xl font-medium tracking-wider text-primary">
              目录
            </h2>
            <TableOfContents />
          </nav>
        </aside>
      </div>
    </div>
  );
}
