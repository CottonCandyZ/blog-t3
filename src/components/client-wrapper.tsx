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
import { AnimatePresence, motion } from 'motion/react'
import ProfileCard from '~/components/profile/profile-card'
import Tags, { type tagProps } from '~/components/posts/tags'

interface TagsContextType {
  toggledTags: Set<string>
  setToggledTags: Dispatch<SetStateAction<Set<string>>>
}
export const TagsContext = createContext({} as TagsContextType)
const ClientWrapper: React.FC<PropsWithChildren<{ tags: tagProps }>> = ({ tags, children }) => {
  const [toggledTags, setToggledTags] = useState(new Set<string>())
  const [tagsExpanded, setTagsExpanded] = useState(false)
  const value = useMemo(() => ({ toggledTags, setToggledTags }), [toggledTags, setToggledTags])
  const home = usePathname() === '/'
  const clearTags = () => {
    setToggledTags(new Set())
    sessionStorage.setItem('tags', JSON.stringify([]))
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  return (
    <div className="relative mt-4 grid auto-rows-max grid-cols-[3fr_1fr] gap-4">
      <TagsContext.Provider value={value}>
        <section
          className={clsx(`col-span-full h-full md:col-start-2 md:block`, {
            hidden: !home,
          })}
        >
          <div className="md:sticky md:top-[72px] md:flex md:flex-col md:gap-4">
            {home && (
              <search className="relative row-start-1 h-min rounded-2xl bg-primary-bg px-3 py-2.5 shadow-cxs md:rounded-xl md:px-3 md:py-2">
                <div
                  className="flex cursor-pointer select-none items-center justify-between gap-2 rounded-lg text-left active:scale-[0.99]"
                  role="button"
                  tabIndex={0}
                  aria-expanded={tagsExpanded}
                  onClick={() => setTagsExpanded((expanded) => !expanded)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setTagsExpanded((expanded) => !expanded)
                    }
                  }}
                >
                  <div
                    className="flex min-w-0 flex-1 items-center justify-between"
                  >
                    <span
                      className={`relative pl-3 text-lg font-semibold md:text-lg
                      before:absolute before:left-0 before:top-1.5 before:h-4 before:w-1 before:rounded-md md:before:top-1.5
                      before:bg-primary-medium`}
                    >
                      Tags
                    </span>
                  </div>
                  <span className="flex shrink-0 items-center gap-2">
                    {toggledTags.size > 0 && (
                      <button
                        type="button"
                      className="group flex select-none items-center gap-1 rounded-full bg-primary-light/55 px-2 py-0.5 text-xs font-semibold text-primary transition hover:bg-primary-small hover:text-white hover:shadow-sm active:scale-95"
                        aria-label="清除已选标签"
                        onClick={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                          clearTags()
                        }}
                        onPointerDown={(event) => {
                          event.stopPropagation()
                        }}
                      >
                        <span>{toggledTags.size}</span>
                        <span className="i-mingcute-close-circle-line size-3.5 group-hover:hidden" />
                        <span className="i-mingcute-close-circle-fill hidden size-3.5 group-hover:block" />
                      </button>
                    )}
                    <span
                      className={clsx(
                        'i-mingcute-down-line size-5 shrink-0 text-primary transition-transform duration-200',
                        {
                          'rotate-180': tagsExpanded,
                        },
                      )}
                    />
                  </span>
                </div>
              <AnimatePresence initial={false}>
                {tagsExpanded && (
                  <motion.div
                    key="tags-panel"
                    initial={{ height: 0, opacity: 0, y: -4 }}
                    animate={{ height: 'auto', opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 h-min">
                      <Tags {...tags} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </search>
            )}
            <div className="mt-4 hidden rounded-2xl bg-primary-bg shadow-cxs md:mt-0 md:block">
              <ProfileCard />
            </div>
          </div>
        </section>
        <section
          className={clsx(`col-span-full md:col-start-1 md:col-end-1 md:row-start-1`, {
            'row-start-2': home,
            'row-start-1': !home,
          })}
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
