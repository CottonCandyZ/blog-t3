import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getPostContent, isPostFileNotFoundError } from '~/server/fetch/posts'
import TableOfContents from '~/components/posts/table-of-contents'
import PostInfo from '~/components/posts/post-info'
import Comments from '~/components/comment'
import AIGeneratedBanner from '~/components/posts/ai-generated-banner'
import PostViewCountLoader, {
  PostViewCountFallback,
} from '~/components/posts/post-view-count-loader'
import { getStalePostViews } from '~/server/fetch/post-views'

export default async function PostContent({ slug }: { slug: string }) {
  const decodedSlug = decodeURIComponent(slug)
  let post: Awaited<ReturnType<typeof getPostContent>>
  let staleViews: Awaited<ReturnType<typeof getStalePostViews>>

  try {
    ;[post, staleViews] = await Promise.all([
      getPostContent(`posts/${decodedSlug}.mdx`),
      getStalePostViews(decodedSlug),
    ])
  } catch (error) {
    if (isPostFileNotFoundError(error)) notFound()
    throw error
  }

  const { content, frontmatter } = post

  return (
    <div className="flex flex-row justify-center gap-10 lg:justify-normal">
      <div className="relative grow overflow-hidden">
        <article
          className="markdown-body mt-4 rounded-2xl bg-primary-bg px-4 py-5 shadow-cxs md:px-8 md:py-10"
          data-toc-root={decodedSlug}
        >
          <header className="mb-4 md:mb-5">
            <h1
              className={`relative text-2xl font-bold leading-tight before:absolute before:-left-2 before:top-1.5 before:h-5 before:w-1 before:rounded-md before:bg-primary-medium md:text-4xl md:before:-left-3 md:before:top-2 md:before:h-6`}
            >
              {frontmatter.title}
            </h1>
            {frontmatter.aiGenerated && <AIGeneratedBanner notice={frontmatter.aiNotice} />}
            <div className="mt-3 md:mt-4">
              <PostInfo
                date={frontmatter.date}
                tags={frontmatter.tags}
                viewCount={
                  <Suspense fallback={<PostViewCountFallback views={staleViews} />}>
                    <PostViewCountLoader slug={decodedSlug} incrementViews />
                  </Suspense>
                }
              />
            </div>
          </header>
          <hr className="mb-6 border-t border-dotted border-primary-medium md:mb-8"></hr>
          {content}
        </article>
        <div className="mt-4 rounded-2xl bg-primary-bg px-4 py-4 shadow-cxs md:px-8 md:py-5">
          <Comments slug={decodedSlug} />
        </div>
      </div>
      <aside className="sticky top-20 hidden h-max max-h-[calc(-80px+100vh)] w-56 shrink-0 overflow-auto p-2 lg:block lg:gap-4">
        <nav className="flex flex-col gap-2">
          <h2 className="w-max text-2xl font-medium tracking-wider text-primary">目录</h2>
          <TableOfContents rootKey={decodedSlug} />
        </nav>
      </aside>
    </div>
  )
}
