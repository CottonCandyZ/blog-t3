'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CloseIcon, NavIcon } from '~/components/icons'
import { CONFIG } from '~/config'

const MobileNav: React.FC = () => {
  const [expend, setExpend] = useState(false)
  const pathname = usePathname()
  return (
    <div className="relative h-0 md:hidden">
      <button
        className="fixed right-8 top-[26px] z-20 text-primary"
        onClick={() => setExpend(!expend)}
        type="button"
      >
        {expend
          ? (
            <CloseIcon className="size-9" />
            )
          : (
            <NavIcon className="size-9" />
            )}
      </button>
      <div
        className={clsx('fixed inset-0 z-10', {
          'pointer-events-none': !expend,
        })}
      >
        <button
          onClick={() => setExpend(false)}
          className={clsx(
            'absolute inset-0 z-10 backdrop-blur-2xl transition-opacity duration-500',
            {
              'opacity-1 touch-none': expend,
              'touch-auto opacity-0': !expend,
            },
          )}
          type="button"
        >
        </button>
        <nav className="absolute bottom-20 left-0 z-20 flex h-2/4 w-max flex-col justify-between text-primary-small">
          <ul className="flex flex-col gap-5">
            {CONFIG.nav_router.map((item, index) => {
              return (
                <li
                  key={item.name}
                  className={clsx(
                    `duration- -translate-x-full 
                    tracking-widest
                    transition-transform${(index + 4) * 100}`,
                    {
                      'translate-x-0': expend,
                      '-translate-x-full': !expend,
                    },
                  )}
                >
                  <Link
                    href={item.href}
                    className={clsx(
                      `relative ml-10 flex w-max px-3 py-2 text-4xl 
                      font-bold leading-8 drop-shadow-sm
                      before:absolute before:inset-x-0 before:bottom-0 
                      before:-z-10 before:rounded-xl 
                      before:bg-primary-light `,
                      {
                        'pointer-events-none before:h-full before:bg-primary-light before:shadow-sm':
                          pathname === item.href,
                      },
                    )}
                    onClick={() => setExpend(false)}
                  >
                    <item.icon className="mr-1 text-[1em]" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
