'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { CONFIG } from '~/config'

export default function NavigationBar() {
  const pathname = usePathname()
  const router_content = CONFIG.nav_router
  return (
    <nav>
      <ul className="flex justify-center gap-4">
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
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          `relative z-0 mx-auto flex w-max items-center
          leading-8 transition-all duration-300 before:absolute before:inset-x-0
          before:bottom-0 before:-z-10 before:rounded-xl before:bg-primary-light active:scale-90 active:duration-0
           `,
          {
            [`pointer-events-none px-3 before:h-full before:bg-primary-light before:shadow-sm`]:
              current === true,
            [`group before:h-1 before:bg-primary-light before:transition-all before:duration-300 hover:px-3
            hover:before:h-full hover:before:bg-primary-light hover:before:shadow-sm`]:
              current === false,
          },
        )}
      >
        <span
          className={clsx(icon, {
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
