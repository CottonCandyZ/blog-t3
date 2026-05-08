import AboutContent from '~/components/about/about-content'
import Comments from '~/components/comment'
import ClientWrapper from '~/components/client-wrapper'

export const metadata = {
  title: 'About',
}

export default function page() {
  return (
    <ClientWrapper>
      <article className="markdown-body rounded-2xl bg-primary-bg px-8 py-10 shadow-cxs">
        <AboutContent />
      </article>
      <div className="mt-4 rounded-2xl bg-primary-bg px-8 py-5 shadow-cxs">
        <Comments slug="about" />
      </div>
    </ClientWrapper>
  )
}
