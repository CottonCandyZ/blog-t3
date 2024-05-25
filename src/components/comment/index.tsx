import { Suspense } from 'react'
import User from '~/components/comment/user'
import CommentsList from '~/components/comment/comments-list'

const Comments: React.FC<{ slug: string }> = ({ slug }) => {
  return (
    <div className="w-full ">
      <div className="markdown-body">
        <h2 id="Comments" className="mdx-h1 anchor">
          <a href="#Comments">Comments</a>
        </h2>
      </div>
      <div className="mt-5">
        <Suspense
          fallback={<div className="h-11 w-full animate-pulse rounded-2xl bg-primary-light"></div>}
        >
          <User slug={slug} />
        </Suspense>
      </div>
      <div className="mt-10 flex items-center justify-center">
        <Suspense
          fallback={<div className="h-11 w-full animate-pulse rounded-2xl bg-primary-light"></div>}
        >
          <CommentsList slug={slug} />
        </Suspense>
      </div>
    </div>
  )
}

export default Comments
