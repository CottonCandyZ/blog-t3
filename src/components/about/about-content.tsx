import dayjs from 'dayjs'
import MDXComponent from '~/components/posts/mdx-component'
import { getAboutContent } from '~/server/fetch/about'

const AboutContent: React.FC = async () => {
  const { code: aboutCode, frontmatter } = await getAboutContent()
  return (
    <>
      <MDXComponent code={aboutCode} />
      <div className="ml-auto w-max text-primary-dark">
        <time dateTime={frontmatter.date} suppressHydrationWarning>
          {dayjs(frontmatter.date).format('YYYY.M.D')}
        </time>
      </div>
    </>
  )
}

export default AboutContent
