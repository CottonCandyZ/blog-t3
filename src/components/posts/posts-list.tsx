'use client'
import Link from 'next/link'
import { type ReactNode, useContext } from 'react'
import { TagsContext } from '~/components/client-wrapper'
import type { PostFrontmatter } from '~/components/posts'
import { AIGeneratedBadge } from '~/components/posts/ai-generated-banner'
import PostInfo from '~/components/posts/post-info'

export interface PostListProps {
  posts: { slug: string; frontmatter: PostFrontmatter; viewCount?: ReactNode }[]
}

const PostsList: React.FC<PostListProps> = ({ posts }) => {
  const { toggledTags } = useContext(TagsContext)
  if (toggledTags.size !== 0) {
    posts = posts.filter(({ frontmatter }) => {
      if (!frontmatter.tags) return false
      let include = true
      toggledTags.forEach((tagName) => {
        if (!frontmatter.tags?.includes(tagName)) include = false
      })
      return include
    })
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-primary-bg shadow-cxs md:flex md:flex-col md:gap-4 md:overflow-visible md:rounded-none md:bg-transparent md:shadow-none">
      {posts.map(({ slug, frontmatter, viewCount }) => (
        <article
          key={slug}
          className="group relative cursor-pointer border-b border-primary-extralight px-4 py-4 last:border-b-0 md:rounded-2xl md:border-b-0 md:bg-primary-bg md:px-8 md:py-5 md:shadow-cxs"
        >
          {frontmatter.aiGenerated && (
            <AIGeneratedBadge className="absolute right-4 top-4 md:right-6 md:top-5" />
          )}
          <Link href={`/posts/${slug}`}>
            <h1
              className={`relative pr-12 text-lg font-semibold leading-snug before:absolute before:-left-2 before:top-[0.35rem] before:h-3.5 before:w-1 before:rounded-md before:bg-primary-medium group-hover:text-primary md:pr-12 md:text-2xl md:before:-left-3 md:before:top-2 md:before:h-4`}
            >
              {frontmatter.title}
            </h1>
            <div className="mt-3 md:mt-4">
              <PostInfo date={frontmatter.date} tags={frontmatter.tags} viewCount={viewCount} />
            </div>
            <p className="mt-3 text-sm leading-relaxed md:mt-5">{frontmatter.abstract}</p>
            <div className="mt-3 flex flex-row items-center gap-1">
              <h2 className="text-sm font-medium md:text-base">Read More</h2>
              <span
                className={`i-mingcute-arrow-right-line mt-[2px] text-xl transition-transform duration-200 ease-in-out group-hover:translate-x-1 group-hover:text-primary md:text-2xl`}
              />
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}

export default PostsList
