import clsx from 'clsx'
import Link from 'next/link'
import { JSX } from 'react'

const MDXLink: React.FC<JSX.IntrinsicElements['a']> = (props) => {
  const { className, href = '', children, ...rest } = props
  const isPlainAnchor = typeof children === 'string'
  if (href.startsWith('#')) {
    return (
      <a
        {...rest}
        className={clsx(className, '', {
          anchor: rest.id,
        })}
        href={href}
      >
        {children}
      </a>
    )
  }
  if (!href.startsWith('http')) {
    return (
      <Link className={clsx(className, 'mdx-a')} href={href}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(className, 'group/a mdx-a')}
      {...rest}
    >
      {children}
      {isPlainAnchor && (
        <span
          className="i-mingcute-arrow-right-up-line mx-0.5 align-middle text-primary/50 transition-colors group-hover/a:text-primary"
        />
      )}
    </a>
  )
}

export default MDXLink
