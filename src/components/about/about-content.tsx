import dayjs from 'dayjs'
import { getPostContent } from '~/server/fetch/posts'
import '~/styles/markdown.scss'

const AboutContent: React.FC = async () => {
  const { content, frontmatter } = await getPostContent('src/config/about.mdx')

  return (
    <>
      {content}
      <div className="ml-auto w-max text-primary-dark">
        <time dateTime={frontmatter.date} suppressHydrationWarning>
          {dayjs(frontmatter.date).format('YYYY.M.D')}
        </time>
      </div>
    </>
  )
}

export default AboutContent
