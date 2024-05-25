'use client'
import { Highlight, themes } from 'prism-react-renderer'
import { useEffect, useState } from 'react'
import CopyButton from '~/components/posts/content/Codeblock/copy-button'
import { copyToClipboard } from '~/server/tools/clipboard'

interface FencedCodeBlockProps {
  language: string
  codeContent: string
}

const FencedCodeBlock: React.FC<FencedCodeBlockProps> = ({ codeContent, language }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 1500)
  }, [copied])

  async function onCopy() {
    await copyToClipboard(codeContent)
    setCopied(true)
  }

  return (
    <Highlight theme={themes.duotoneLight} code={codeContent} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <div className="relative mb-5 mt-10">
          <div
            className={`absolute -top-7 right-10 size-fit rounded-t-lg bg-[#faf8f5]
            px-3 pt-1 font-semibold text-primary-small`}
          >
            {language.toUpperCase()}
          </div>
          <div className="flex flex-row">
            <pre
              style={style}
              className="mdx-fenced-codeblock relative z-0 w-full overflow-x-auto rounded-l-2xl"
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span>
                    {line.map((token) => (
                      <span key={token.content} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
            <div>
              <div className="h-full w-12 rounded-r-2xl bg-[#faf8f5]">
                <div className="ml-1 mt-4 inline-block fill-primary">
                  <CopyButton copied={copied} onCopy={onCopy} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Highlight>
  )
}

export default FencedCodeBlock
