import FencedCodeBlock from '~/components/posts/content/Codeblock/fenced-code-block'

interface CodeblockProps {
  className?: string
  children?: string
}

const CodeBlock: React.FC<CodeblockProps> = ({ children, className }) => {
  if (!children) return null
  const language = className?.replace(/language-/, '')
  if (!language && !children.endsWith('\n'))
    return <code className="mdx-inline-code">{children}</code>
  children = children.slice(0, -1) // remove extra '/n'
  return <FencedCodeBlock language={language!} codeContent={children} />
}

export default CodeBlock
