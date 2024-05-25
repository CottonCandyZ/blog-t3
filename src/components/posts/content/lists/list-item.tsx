'use client'
import clsx from 'clsx'
import { Children, type ReactElement, useContext } from 'react'
import { Checked, Dot, Unchecked } from '~/components/icons'
import { ListContext } from '~/components/posts/content/lists/list-provider'

const ListItem: React.FC<JSX.IntrinsicElements['li']> = (props) => {
  const { children, className, ...rest } = props
  const { type } = useContext(ListContext)
  const childrenList = Children.toArray(children)
  const getMarker = {
    ul: () => (
      <span className="pr-2 pt-[4px]">
        <Dot className="-ml-1 mr-1 text-xl text-primary" />
      </span>
    ),
    ol: () => null,
    tl: () => (
      <span className="pr-2 pt-[5px]">
        {(childrenList[0] as ReactElement<JSX.IntrinsicElements['input']>).props.checked ? (
          <Checked className="-ml-1 mr-1 text-xl text-primary" />
        ) : (
          <Unchecked className="-ml-1 mr-1 text-xl text-primary" />
        )}
      </span>
    ),
  }[type]

  return (
    <li
      className={clsx(className, `mdx-li my-4 flex items-start`, {
        anchor: rest.id,
      })}
      {...rest}
    >
      {getMarker()}
      <div className="">{type !== 'tl' ? children : childrenList.slice(2)}</div>
    </li>
  )
}

export default ListItem
