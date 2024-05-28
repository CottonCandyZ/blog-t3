import FencedCodeBlock from '~/components/posts/content/Codeblock/fenced-code-block'
import { codeToHtml } from 'shiki'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel
} from '@shikijs/transformers'
import {} from 'shiki/themes/vitesse-light.mjs'

interface CodeblockProps {
  className?: string
  children?: string
}

const CodeBlock: React.FC<CodeblockProps> = async ({ children, className }) => {
  if (!children) return null
  const language = className?.replace(/language-/, '')
  if (!language && !children.endsWith('\n'))
    return <code className="mdx-inline-code">{children}</code>
  children = children.slice(0, -1) // remove extra '/n'
  const code = await codeToHtml(children, {
    lang: language ? language : 'plaintext',
    themes: {
      light: 'vitesse-light',
      dark: 'nord',
    },
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerNotationFocus(),
      transformerNotationErrorLevel(),
      {
        pre(node) {
          delete node.properties.style
        },
      },
    ],
  })
  return <FencedCodeBlock language={language!} codeContent={code} />
}

export default CodeBlock
