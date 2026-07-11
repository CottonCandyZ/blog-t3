'use client'

import { useEffect, useState } from 'react'

const relativeTime = new Intl.RelativeTimeFormat('zh-CN', { numeric: 'auto' })
const absoluteTime = new Intl.DateTimeFormat('zh-CN', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function formatTimeFromNow(time: Date) {
  const diff = time.getTime() - Date.now()
  const seconds = Math.round(diff / 1000)
  if (Math.abs(seconds) < 60) return relativeTime.format(seconds, 'second')

  const minutes = Math.round(diff / 60_000)
  if (Math.abs(minutes) < 60) return relativeTime.format(minutes, 'minute')

  const hours = Math.round(diff / 3_600_000)
  if (Math.abs(hours) < 24) return relativeTime.format(hours, 'hour')

  const days = Math.round(diff / 86_400_000)
  if (Math.abs(days) < 31) return relativeTime.format(days, 'day')

  return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium' }).format(time)
}

const TimeFromNow: React.FC<{ time: Date }> = ({ time }) => {
  const [fromNow, setFromNow] = useState(() => formatTimeFromNow(time))

  useEffect(() => {
    const interval = window.setInterval(() => setFromNow(formatTimeFromNow(time)), 30_000)
    return () => window.clearInterval(interval)
  }, [time])

  return (
    <time dateTime={time.toISOString()} title={absoluteTime.format(time)} suppressHydrationWarning>
      {fromNow}
    </time>
  )
}
export default TimeFromNow
