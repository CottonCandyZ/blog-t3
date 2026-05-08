'use client'

import { useActionState, useEffect, useRef } from 'react'
import { incrementPostViewAction } from '~/server/action/post-views'

interface PostViewCountProps {
  slug?: string
  views: number
  incrementViews?: boolean
  hasViewed?: boolean
}

const PostViewCount: React.FC<PostViewCountProps> = ({
  slug,
  views,
  incrementViews = false,
  hasViewed = false,
}) => {
  const [incrementState, formAction] = useActionState(incrementPostViewAction, {})
  const didIncrement = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const shouldIncrement = Boolean(slug && incrementViews && !hasViewed)
  const viewCount = incrementState.views ?? (shouldIncrement ? views + 1 : views)

  useEffect(() => {
    if (!shouldIncrement || didIncrement.current) return

    didIncrement.current = true
    formRef.current?.requestSubmit()
  }, [shouldIncrement])

  return (
    <>
      <span>{viewCount.toLocaleString()}</span>
      {shouldIncrement && (
        <form ref={formRef} action={formAction} hidden>
          <input name="slug" value={slug} readOnly />
        </form>
      )}
    </>
  )
}

export default PostViewCount
