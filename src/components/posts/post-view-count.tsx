'use client'

import { useEffect, useRef, useState } from 'react'

interface PostViewCountProps {
  slug?: string
  views: number
  incrementViews?: boolean
}

const PostViewCount: React.FC<PostViewCountProps> = ({ slug, views, incrementViews = false }) => {
  const [viewCount, setViewCount] = useState(views)
  const didIncrement = useRef(false)

  useEffect(() => {
    if (!slug || !incrementViews || didIncrement.current) return

    didIncrement.current = true

    fetch(`/api/views/${encodeURIComponent(slug)}`, { method: 'POST' })
      .then((res) => (res.ok ? res.json() : undefined))
      .then((data: { views?: number } | undefined) => {
        if (typeof data?.views === 'number') setViewCount(data.views)
      })
      .catch((e: unknown) => {
        console.error(e)
      })
  }, [incrementViews, slug])

  return <span>{viewCount.toLocaleString()}</span>
}

export default PostViewCount
