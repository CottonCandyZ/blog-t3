import { CONFIG } from '~/config'

export default function SocialLinks() {
  const social_link = CONFIG.social_link
  return (
    <ul className="flex w-max justify-center gap-1">
      {social_link.map(item => (
        <ListItem
          key={item.name}
          content={item.name}
          Icon={item.icon}
          href={item.href}
        />
      ))}
    </ul>
  )
}

function ListItem({
  content,
  Icon,
  href,
}: {
  content: string
  Icon: React.FC<{ className?: string, color?: string }>
  href: string
}) {
  return (
    <li className="active:scale-95">
      <a
        href={href}
        target="_blank"
        after-content={content}
        className={`group relative flex size-10 cursor-pointer items-center justify-center rounded-full
      border-primary-light transition-all duration-500 after:absolute
      after:-bottom-5 after:z-10 after:rounded-2xl after:bg-primary-light
      after:px-1.5 after:py-1 after:text-xs after:text-primary
      after:opacity-0 after:shadow-md after:transition
      after:duration-500 after:content-[attr(after-content)]
      hover:bg-primary-light hover:shadow-md hover:after:translate-y-2 hover:after:opacity-100`}
      >
        <Icon className="size-6 text-primary transition-all duration-500 ease-out" />
      </a>
    </li>
  )
}
