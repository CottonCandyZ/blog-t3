'use client'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

type Headings = Heading[]

const headingSelector = ':is(h2, h3, h4, h5, h6)[id]'

function findTocRoot(rootKey: string) {
  return Array.from(document.querySelectorAll('article.markdown-body[data-toc-root]')).find(
    (element): element is HTMLElement =>
      element instanceof HTMLElement && element.dataset.tocRoot === rootKey,
  )
}

function collectHeadings(rootKey: string): Headings {
  const root = findTocRoot(rootKey)
  if (!root) return []

  const usedIds = new Set<string>()

  return Array.from(root.querySelectorAll(headingSelector))
    .filter((element): element is HTMLElement => element instanceof HTMLElement)
    .reduce<Headings>((items, element) => {
      const id = element.id.trim()
      const text = element.textContent?.trim()

      if (!id || !text || usedIds.has(id)) return items
      if (element.classList.contains('invisible') || element.getAttribute('aria-hidden') === 'true') {
        return items
      }

      usedIds.add(id)
      items.push({
        id,
        text,
        level: Number(element.tagName.substring(1)),
      })
      return items
    }, [])
}

function useHeadings(rootKey: string) {
  const [headings, setHeadings] = useState<Headings>([])

  useEffect(() => {
    const updateHeadings = () => setHeadings(collectHeadings(rootKey))

    updateHeadings()

    const markdownBody = findTocRoot(rootKey)
    if (!markdownBody) return undefined

    const observer = new MutationObserver(updateHeadings)
    observer.observe(markdownBody, {
      attributes: true,
      attributeFilter: ['id', 'class', 'aria-hidden'],
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [rootKey])
  return headings
}

function useScrollSpy(headings: Headings, rootKey: string) {
  const [activeId, setActiveId] = useState<string>()

  useEffect(() => {
    const root = findTocRoot(rootKey)
    const elements = root
      ? headings
          .map(({ id }) =>
            Array.from(root.querySelectorAll('[id]')).find(
              (element): element is HTMLElement =>
                element instanceof HTMLElement && element.id === id,
            ),
          )
          .filter((element): element is HTMLElement => element instanceof HTMLElement)
      : []

    let frame: number | undefined

    if (elements.length === 0) {
      const emptyFrame = window.requestAnimationFrame(() => {
        setActiveId(undefined)
      })

      return () => window.cancelAnimationFrame(emptyFrame)
    }

    const offset = 112

    const updateActiveHeading = () => {
      let currentId = ''

      for (const element of elements) {
        if (element.getBoundingClientRect().top <= offset) {
          currentId = element.id
        } else {
          break
        }
      }

      setActiveId((oldId) => (oldId === currentId ? oldId : currentId))
    }

    const scheduleUpdate = () => {
      if (frame !== undefined) return

      frame = window.requestAnimationFrame(() => {
        frame = undefined
        updateActiveHeading()
      })
    }

    updateActiveHeading()

    const observer = new IntersectionObserver(scheduleUpdate, {
      rootMargin: `-${offset}px 0px -70% 0px`,
      threshold: [0, 1],
    })

    elements.forEach((element) => observer.observe(element))
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [headings, rootKey])

  return activeId
}

const TableOfContents: React.FC<{ rootKey: string }> = ({ rootKey }) => {
  const headings = useHeadings(rootKey)
  const activeId = useScrollSpy(headings, rootKey)
  return (
    <ul className="flex list-none flex-col gap-2">
      {headings.map((heading) => {
        return (
          <li key={heading.id} className="active:scale-95">
            <a
              href={`#${heading.id}`}
              className={clsx(`hover:font-semibold hover:text-primary-dark`, {
                'ml-4 text-sm': heading.level > 2,
                'text-base font-medium': heading.level === 2,
                'font-semibold text-primary-dark': activeId === heading.id,
                'text-primary-medium': activeId !== heading.id,
              })}
            >
              {heading.text}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default TableOfContents
