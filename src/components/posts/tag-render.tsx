import clsx from 'clsx'
import React, { type PropsWithChildren } from 'react'

function tagRenderer(name: string) {
  return ((props) => {
    const { children, className, ...rest } = props
    if (name === 'pre') return children;
    return React.createElement(
      name,
      {
        ...rest,
        className: clsx(`mdx-${name}`, className, {
          anchor: rest.id,
        }),
      },
      children,
    )
  }) as React.FC<PropsWithChildren<HTMLElement>>
}

export default tagRenderer
