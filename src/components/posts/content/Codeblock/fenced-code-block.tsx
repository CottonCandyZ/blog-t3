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
    <div className="relative mb-4 mt-5 overflow-hidden rounded-xl bg-[rgb(var(--color-code-bg))] ring-1 ring-primary-light/70 md:mb-5 md:mt-8 md:rounded-2xl">
      <div className="flex h-8 items-center justify-between border-b border-primary-light/80 bg-[rgb(var(--color-code-header))] px-2.5 md:h-9 md:px-3">
        <div className="rounded bg-primary/10 px-1.5 py-0.5 text-[0.7rem] font-semibold leading-none text-primary-small md:text-xs">
          {language.toUpperCase()}
        </div>
        <CopyButton copied={copied} onCopy={onCopy} />
      </div>
      <div
        className="mdx-fenced-codeblock w-full overflow-hidden"
        dangerouslySetInnerHTML={{ __html: codeContent }}
      />
    </div>
  )
}

export default FencedCodeBlock
