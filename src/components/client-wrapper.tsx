'use client'
import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import ProfileCard from '~/components/profile/profile-card'
import Tags, { type tagProps } from '~/components/posts/tags'

interface TagsContextType {
  toggledTags: Set<string>
  setToggledTags: Dispatch<SetStateAction<Set<string>>>
}
export const TagsContext = createContext({} as TagsContextType)
const ClientWrapper: React.FC<PropsWithChildren<{ tags: tagProps }>> = ({
  tags,
  children,
}) => {
  const [toggledTags, setToggledTags] = useState(new Set<string>())
  const value = useMemo(() => ({ toggledTags, setToggledTags }), [toggledTags, setToggledTags])
  const home = usePathname() === '/'
  return (
    <div className="relative mt-4 grid auto-rows-max grid-cols-[3fr_1fr] gap-4">
      <TagsContext.Provider value={value}>
        <section
          className={clsx(`col-span-full h-full md:col-start-2 md:block`, {
            hidden: !home,
          })}
        >
          <div className="hidden rounded-2xl bg-primary-bg shadow-cxs md:block">
            <ProfileCard />
          </div>
          {home && (
            <search
              className="relative row-start-1 h-min rounded-2xl bg-primary-bg p-4 shadow-cxs
              md:sticky md:top-[104px] md:mt-4 "
            >
              <h2
                className="relative pl-3 text-xl font-semibold
                before:absolute before:left-0 before:top-1.5 before:h-4 before:w-1 before:rounded-md
                before:bg-primary-medium"
              >
                Tags
              </h2>
              <div className="mt-2 h-min">
                <Tags {...tags} />
              </div>
            </search>
          )}
        </section>
        <section
          className={clsx(
            `col-span-full md:col-start-1 md:col-end-1 md:row-start-1`,
            {
              'row-start-2': home,
              'row-start-1': !home,
            },
          )}
        >
          {children}
        </section>
      </TagsContext.Provider>
      <section className="col-span-full md:hidden">
        <div className="rounded-2xl bg-primary-bg shadow-cxs">
          <ProfileCard />
        </div>
      </section>
    </div>
  )
}

export default ClientWrapper
