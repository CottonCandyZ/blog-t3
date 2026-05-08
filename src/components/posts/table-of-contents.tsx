'use client'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

type Headings = Heading[]

const headingSelector = 'article.markdown-body :is(h2, h3, h4, h5, h6)[id]'

function collectHeadings(): Headings {
  const usedIds = new Set<string>()

  return Array.from(document.querySelectorAll(headingSelector))
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

function useHeadings() {
  const [headings, setHeadings] = useState<Headings>([])

  useEffect(() => {
    const updateHeadings = () => setHeadings(collectHeadings())

    updateHeadings()

    const markdownBody = document.querySelector('article.markdown-body')
    if (!markdownBody) return undefined

    const observer = new MutationObserver(updateHeadings)
    observer.observe(markdownBody, {
      attributes: true,
      attributeFilter: ['id', 'class', 'aria-hidden'],
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])
  return headings
}

function useScrollSpy(headings: Headings) {
  const [activeId, setActiveId] = useState<string>()

  useEffect(() => {
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement)

    if (elements.length === 0) {
      setActiveId(undefined)
      return undefined
    }

    const offset = 112
    let frame: number | undefined

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
  }, [headings])

  return activeId
}

const TableOfContents: React.FC = () => {
  const headings = useHeadings()
  const activeId = useScrollSpy(headings)
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
