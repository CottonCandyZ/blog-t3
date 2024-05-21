'use client'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import type { MDXContentProps } from 'mdx-bundler/dist/types'
import NextImage from '~/components/Image'
import tagRenderer from '~/components/posts/tag-render'
import UnorderedList from '~/components/posts/content/lists/unordered-list'
import OrderedList from '~/components/posts/content/lists/ordered-list'
import ListItem from '~/components/posts/content/lists/list-item'
import CodeBlock from '~/components/posts/content/Codeblock'
import MDXLink from '~/components/posts/content/link'

export default function MDXComponent({ code }: { code: string }) {
  const components = {
    h1: tagRenderer('h1'),
    h2: tagRenderer('h2'),
    h3: tagRenderer('h3'),
    h4: tagRenderer('h4'),
    h5: tagRenderer('h5'),
    h6: tagRenderer('h6'),
    p: tagRenderer('p'),
    blockquote: tagRenderer('blockquote'),
    table: tagRenderer('table'),
    thead: tagRenderer('thead'),
    tbody: tagRenderer('tbody'),
    tr: tagRenderer('tr'),
    th: tagRenderer('th'),
    td: tagRenderer('td'),
    em: tagRenderer('em'),
    strong: tagRenderer('strong'),
    del: tagRenderer('del'),
    img: NextImage,
    ul: UnorderedList,
    ol: OrderedList,
    li: ListItem,
    hr: tagRenderer('hr'),
    code: CodeBlock,
    a: MDXLink,
  } as unknown as MDXContentProps['components']
  const Component = useMemo(() => getMDXComponent(code), [code])
  return <Component components={components} />
}
