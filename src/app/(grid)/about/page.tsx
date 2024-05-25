import { Suspense } from 'react'
import AboutContent from '~/components/about/about-content'
import AboutSkeleton from '~/components/about/about-skeleton'
import Comments from '~/components/comment'

export const metadata = {
  title: 'About',
}

export default function page() {
  return (
    <>
      <article className="markdown-body rounded-2xl bg-primary-bg px-8 py-10 shadow-cxs">
        <AboutContent />
      </article>
      <div className="mt-4 rounded-2xl bg-primary-bg px-8 py-5 shadow-cxs">
        <Comments slug="about" />
      </div>
    </>
  )
}
