'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { CONFIG } from '~/config'

const selectedIconMap: Record<string, string> = {
  'i-mingcute-home-2-line': 'i-mingcute-home-2-fill',
  'i-mingcute-toy-horse-line': 'i-mingcute-toy-horse-fill',
  'i-mingcute-link-line': 'i-mingcute-link-fill',
  'i-mingcute-message-4-line': 'i-mingcute-message-4-fill',
}

export default function NavigationBar() {
  const pathname = usePathname()
  const router_content = CONFIG.nav_router
  return (
    <nav>
      <ul className="flex items-center justify-center gap-1.5">
        {router_content.map((item) => (
          <ListItem
            key={item.name}
            content={item.name}
            href={item.href}
            icon={item.icon}
            current={pathname === item.href}
          />
        ))}
      </ul>
    </nav>
  )
}

function ListItem({
  content,
  icon,
  href,
  current = false,
}: {
  content: string
  icon: string
  href: string
  current?: boolean
}) {
  const displayIcon = current ? (selectedIconMap[icon] ?? icon) : icon

  return (
    <li className="flex items-center">
      <Link
        href={href}
        className={clsx(
          `relative z-0 mx-auto flex h-8 w-max items-center justify-center px-3 leading-none
          transition-all duration-300 before:absolute before:bottom-0 before:-z-10
          before:bg-primary-light active:scale-90 active:duration-0
           `,
          {
            [`pointer-events-none before:inset-x-0 before:h-full before:rounded-xl before:bg-primary-light before:shadow-sm`]:
              current === true,
            [`group before:inset-x-0 before:h-full before:rounded-xl before:bg-primary-light before:opacity-0
            before:transition before:duration-300 hover:before:opacity-100 hover:before:shadow-sm`]:
              current === false,
          },
        )}
      >
        <span
          className={clsx(displayIcon, {
            [`mr-1 text-[1em]`]: current === true,
            [`group-hover:animate-backshake mr-0 text-[0px] transition-all duration-300 group-hover:mr-1 group-hover:text-[1em]`]:
              current === false,
          })}
        ></span>
        {content}
      </Link>
    </li>
  )
}
