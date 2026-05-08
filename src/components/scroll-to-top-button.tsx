'use client'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

function getScrollProgress() {
  const scrollTop = window.scrollY
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight

  if (scrollableHeight <= 0) return 0
  return Math.min(1, Math.max(0, scrollTop / scrollableHeight))
}

export default function ScrollToTopButton() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame: number | undefined

    const updateProgress = () => {
      frame = undefined
      setProgress(getScrollProgress())
    }

    const scheduleUpdate = () => {
      if (frame !== undefined) return
      frame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  return (
    <button
      type="button"
      aria-label="返回顶部"
      className={clsx(
        `fixed bottom-5 right-5 z-30 flex size-10 items-center justify-center rounded-full p-[2px]
        shadow-cxs transition duration-200 hover:-translate-y-0.5 active:scale-95 md:bottom-6 md:right-8 md:size-11`,
        progress > 0.02 ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      style={{
        background: `conic-gradient(rgb(var(--color-primary)) ${progress * 360}deg, rgb(var(--color-primary-light) / 0.55) 0deg)`,
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <span className="flex size-full items-center justify-center rounded-full bg-primary-bg text-primary">
        <span className="i-mingcute-arrow-up-line size-5 md:size-6" />
      </span>
    </button>
  )
}
