'use client'
import type { PropsWithChildren } from 'react'

const MainWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="mx-auto min-h-[calc(-72px+100dvh)] max-w-6xl px-2 pb-20 md:px-10">
      {children}
    </main>
  )
}

export default MainWrapper
