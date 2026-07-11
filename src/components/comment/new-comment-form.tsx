'use client'
import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createCommentAction, type CommentFormState } from '~/server/action/comments-list'

const initialState: CommentFormState = {
  status: 'idle',
  message: '',
  content: '',
  revision: 0,
}

function Submit() {
  const { pending, data } = useFormStatus()
  const pendingContent = data?.get('content')

  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={pending ? '正在发布评论' : '发布评论'}
      className="inline-flex min-w-28 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-bg shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
    >
      {pending ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-bg/40 border-t-primary-bg" />
          发布中
        </>
      ) : (
        <>
          <span className="icon-[mingcute--send-plane-fill] text-base" aria-hidden="true" />
          发布评论
        </>
      )}
      {pending && typeof pendingContent === 'string' ? (
        <span className="sr-only">，共 {pendingContent.length} 个字符</span>
      ) : null}
    </button>
  )
}

const NewCommentForm: React.FC<{ slug: string }> = ({ slug }) => {
  const [formState, formAction] = useActionState(createCommentAction.bind(null, slug), initialState)
  return (
    <form
      className="rounded-2xl border border-primary-light/60 bg-primary-extralight/45 p-3 shadow-sm sm:p-4"
      action={formAction}
    >
      <label
        htmlFor="content"
        className="flex items-center gap-2 text-sm font-semibold text-primary-dark"
      >
        <span className="icon-[mingcute--edit-3-line] text-lg text-primary" aria-hidden="true" />
        写下你的想法
      </label>
      <CommentEditor
        key={formState.revision}
        initialContent={formState.content}
        invalid={Boolean(formState.fieldError)}
      />
      <div className="mt-3 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          id="comment-feedback"
          className="min-h-5 text-sm font-medium"
          role="status"
          aria-live="polite"
        >
          {formState.message ? (
            <p
              className={
                formState.status === 'success'
                  ? 'text-primary-dark'
                  : 'text-red-600 dark:text-red-300'
              }
            >
              <span
                className={
                  formState.status === 'success'
                    ? 'icon-[mingcute--check-circle-fill] mr-1.5 align-[-0.15em] text-primary'
                    : 'icon-[mingcute--alert-fill] mr-1.5 align-[-0.15em]'
                }
                aria-hidden="true"
              />
              {formState.fieldError ?? formState.message}
            </p>
          ) : (
            <p className="text-primary-light">你的评论会公开显示在这篇内容下方</p>
          )}
        </div>
        <Submit />
      </div>
    </form>
  )
}

function CommentEditor({ initialContent, invalid }: { initialContent: string; invalid: boolean }) {
  const [length, setLength] = useState(initialContent.length)

  return (
    <div className="relative mt-3">
      <textarea
        id="content"
        name="content"
        rows={5}
        maxLength={1000}
        defaultValue={initialContent}
        onInput={(event) => setLength(event.currentTarget.value.length)}
        placeholder="友善交流，认真表达。支持换行，最多 1000 字。"
        required
        aria-describedby="comment-help comment-feedback"
        aria-invalid={invalid}
        className="block min-h-32 w-full resize-y rounded-xl border-0 bg-primary-bg px-4 py-3 pb-9 text-base leading-7 text-primary-dark shadow-sm ring-1 ring-inset ring-primary-light/80 transition placeholder:text-primary-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
      />
      <span
        id="comment-help"
        className="pointer-events-none absolute bottom-2.5 right-3 text-xs tabular-nums text-primary-light"
      >
        {length} / 1000
      </span>
    </div>
  )
}

export default NewCommentForm
