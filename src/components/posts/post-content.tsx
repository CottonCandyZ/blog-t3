import { getPostContent } from "~/server/fetch/posts";
import MDXComponent from "~/components/posts/mdx-component";
import TableOfContents from "~/components/posts/table-of-contents";
import dynamic from "next/dynamic";
const Comments = dynamic(() => import("~/components/comment"), {
  loading: () => (
    <div className="flex items-center justify-center">
      <p className="text-lg font-bold text-primary">加载评论区中...</p>
    </div>
  ),
});

export default async function PostContent({ slug }: { slug: string }) {
  const { code, frontmatter } = await getPostContent(decodeURIComponent(slug));
  return (
    <div className="flex flex-row justify-center gap-10 lg:justify-normal">
      <div className="relative w-full max-w-3xl shrink-0">
        <article className="markdown-body">
          <h2 className="anchor invisible absolute top-4" id="Introduction">
            {frontmatter.title}
          </h2>
          <MDXComponent code={code} />
        </article>
        <div className="mt-4">
          <Comments slug={slug} />
        </div>
      </div>
      <aside className="sticky top-28 hidden h-max max-h-[calc(-112px+100vh)] w-full overflow-auto p-2 lg:block lg:gap-4">
        <nav className="flex flex-col gap-2">
          <h2 className="text-2xl font-medium tracking-wider text-primary">
            目录
          </h2>
          <TableOfContents />
        </nav>
      </aside>
    </div>
  );
}
