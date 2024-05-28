'use client'
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
    <div className="relative mb-5 mt-10 rounded-2xl bg-gray-50">
      <div
        className={`absolute -top-7 right-10 size-fit rounded-t-lg
            bg-gray-50 px-3 pt-1 font-semibold text-primary-small`}
      >
        {language.toUpperCase()}
      </div>
      <div className="flex flex-row">
        <div
          className="mdx-fenced-codeblock w-full overflow-hidden"
          dangerouslySetInnerHTML={{ __html: codeContent }}
        />
        <div>
          <div className="h-full w-12 rounded-r-2xl ">
            <div className="ml-1 mt-4 inline-block fill-primary">
              <CopyButton copied={copied} onCopy={onCopy} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FencedCodeBlock
