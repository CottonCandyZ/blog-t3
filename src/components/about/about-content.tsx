import dayjs from 'dayjs'
import type { PostFrontmatter } from '~/components/posts'
import MDXComponent from '~/components/posts/mdx-component'
import { getPostContent } from '~/server/fetch/posts'

const AboutContent: React.FC = async () => {
  const mdxSource = await getPostContent(decodeURIComponent('config/about.mdx'))
  const frontmatter = mdxSource.frontmatter as unknown as PostFrontmatter
  return (
    <>
      <MDXComponent mdxSource={mdxSource} />
      <div className="ml-auto w-max text-primary-dark">
        <time dateTime={frontmatter.date} suppressHydrationWarning>
          {dayjs(frontmatter.date).format('YYYY.M.D')}
        </time>
      </div>
    </>
  )
}

export default AboutContent
