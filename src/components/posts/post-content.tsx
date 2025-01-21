import { getPostContent } from '~/server/fetch/posts'
import TableOfContents from '~/components/posts/table-of-contents'
import PostInfo from '~/components/posts/post-info'
import Comments from '~/components/comment'

export default async function PostContent({ slug }: { slug: string }) {
  const { content, frontmatter } = await getPostContent(decodeURIComponent(`posts/${slug}.mdx`))

  return (
    <div className="flex flex-row justify-center gap-10 lg:justify-normal">
      <div className="relative grow overflow-hidden">
        <article className="markdown-body mt-4 rounded-2xl bg-primary-bg px-5 py-6 shadow-cxs md:px-8 md:py-10">
          <header className="mb-5">
            <h1
              className={`relative text-4xl font-bold
          before:absolute before:-left-2 before:top-2 before:h-6 before:w-1 before:rounded-md before:bg-primary-medium md:before:-left-3`}
            >
              {frontmatter.title}
            </h1>
            <div className="mt-4">
              <PostInfo date={frontmatter.date} tags={frontmatter.tags} />
            </div>
          </header>
          <hr className="mb-8 border-t border-dotted border-primary-medium"></hr>
          <h2 className="anchor invisible absolute -top-4" id="Introduction">
            {frontmatter.title}
          </h2>
          {content}
        </article>
        <div className="mt-4 rounded-2xl bg-primary-bg px-8 py-5 shadow-cxs">
          <Comments slug={slug} />
        </div>
      </div>
      <aside className="sticky top-28 hidden h-max max-h-[calc(-112px+100vh)] w-56 overflow-auto p-2 lg:block lg:gap-4 shrink-0">
        <nav className="flex flex-col gap-2">
          <h2 className="w-max text-2xl font-medium tracking-wider text-primary">目录</h2>
          <TableOfContents />
        </nav>
      </aside>
    </div>
  )
}
