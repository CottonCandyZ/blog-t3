import Header from "~/components/header";
import PostContent from "~/components/posts/mdx-component";
import { getPostContent } from "~/lib/posts";

export default async function Page({ params }: { params: { slug: string } }) {
  const { code, frontmatter } = await getPostContent(
    decodeURIComponent(params.slug),
  );
  return (
    <div>
      <div className="sticky top-0 mx-auto max-w-6xl px-10 py-3 z-[5]">
        <Header />
      </div>

      <div className="col-span-full h-64 bg-primary-extralight relative">
        <div className="absolute h-16 -top-[4rem] bg-primary-extralight w-full"></div>
        <div className="h-16 z-[4] sticky top-0 bg-primary-extralight"></div>
        <h1 className="relative z-[2] mx-auto mt-10 max-w-6xl px-10 text-4xl font-bold text-primary">
          {frontmatter.title}
        </h1>
      </div>
      <div className="h-16 z-[4] sticky top-0 bg-white"></div>
      <div className="mx-auto flex max-w-6xl flex-row gap-10 px-10">
        <article className="markdown-body w-full basis-2/3">
          <PostContent code={code} />
        </article>
        <div className="sticky top-20 h-min basis-1/3 p-2">
          <h2 className="text-2xl font-medium text-primary tracking-wider">目录</h2>
        </div>
      </div>
    </div>
  );
}
