import { Suspense } from 'react'
import User from '~/components/comment/user'
import CommentsList from '~/components/comment/comments-list'

const Comments: React.FC<{ slug: string }> = ({ slug }) => {
  return (
    <section className="w-full" aria-labelledby="comments-heading">
      <header className="flex items-start gap-3 border-b border-primary-extralight pb-5">
        <span
          className="icon-[mingcute--chat-4-fill] mt-0.5 text-3xl text-primary"
          aria-hidden="true"
        />
        <div>
          <h2 id="comments-heading" className="text-2xl font-bold tracking-tight text-primary-dark">
            一起聊聊
          </h2>
          <p className="mt-1 text-sm leading-6 text-primary-light">
            留下想法，也尊重每一种认真表达
          </p>
        </div>
      </header>
      <div className="mt-5">
        <Suspense
          fallback={<div className="h-44 w-full animate-pulse rounded-2xl bg-primary-extralight" />}
        >
          <User slug={slug} />
        </Suspense>
      </div>
      <div className="mt-8">
        <Suspense
          fallback={
            <div className="space-y-3" aria-label="正在加载评论">
              {[0, 1].map((item) => (
                <div key={item} className="h-28 animate-pulse rounded-2xl bg-primary-extralight" />
              ))}
            </div>
          }
        >
          <CommentsList slug={slug} />
        </Suspense>
      </div>
    </section>
  )
}

export default Comments
