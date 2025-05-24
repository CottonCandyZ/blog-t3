import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import Image from '~/components/posts/content/Image'
import Video from '~/components/posts/content/Video'
import tagRenderer from '~/components/posts/tag-render'
import UnorderedList from '~/components/posts/content/lists/unordered-list'
import OrderedList from '~/components/posts/content/lists/ordered-list'
import ListItem from '~/components/posts/content/lists/list-item'
import CodeBlock from '~/components/posts/content/Codeblock'
import MDXLink from '~/components/posts/content/link'

export const components = {
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
  img: Image,
  Video: Video,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  hr: tagRenderer('hr'),
  pre: tagRenderer('pre'),
  code: CodeBlock,
  a: MDXLink,
} as unknown as MDXRemoteProps['components']
