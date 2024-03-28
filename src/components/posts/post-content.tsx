import { getPostContent } from "~/lib/posts";
import MDXComponent from "~/components/posts/mdx-component";
import TableOfContents from "~/components/posts/table-of-contents";

export default async function PostContent({ slug }: { slug: string }) {
  const { code, frontmatter } = await getPostContent(decodeURIComponent(slug));
  return (
    <div className="flex flex-row justify-center gap-10 lg:justify-normal">
      <article className="markdown-body relative w-full max-w-2xl">
        <h2 className="anchor invisible absolute top-4" id="Introduction">
          {frontmatter.title}
        </h2>
        <MDXComponent code={code} />
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
  );
}
