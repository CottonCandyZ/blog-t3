"use client";
import { Highlight, themes } from "prism-react-renderer";
import { useEffect, useState } from "react";
import CopyButton from "~/components/posts/content/Codeblock/copy-button";
import { copyToClipboard } from "~/lib/tools/clipboard";

interface FencedCodeBlockProps {
  language: string;
  codeContent: string;
}

const FencedCodeBlock: React.FC<FencedCodeBlockProps> = (props) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1500);
    }
  }, [copied]);

  async function onCopy() {
    await copyToClipboard(props.codeContent);
    setCopied(true);
  }

  return (
    <Highlight
      theme={themes.github}
      code={props.codeContent}
      language={props.language}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <div className="relative">
          <div
            className="absolute -top-7 right-10 h-fit w-fit rounded-t-lg 
            bg-[#f6f8fa] px-3 pt-1 font-semibold text-primary-medium"
          >
            {props.language.toUpperCase()}
          </div>
          <div className="absolute right-5 top-4 z-[1] fill-primary">
            <CopyButton copied={copied} onCopy={onCopy} />
          </div>
          <pre
            style={style}
            className="mdx-fenced-codeblock relative z-0 mt-12"
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  );
};

export default FencedCodeBlock;
