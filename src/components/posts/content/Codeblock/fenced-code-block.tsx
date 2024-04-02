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
      theme={themes.duotoneLight}
      code={props.codeContent}
      language={props.language}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <div className="relative mt-10 mb-5">
          <div
            className="absolute -top-7 right-10 h-fit w-fit rounded-t-lg 
            bg-[#faf8f5] px-3 pt-1 font-semibold text-primary-medium"
          >
            {props.language.toUpperCase()}
          </div>
          <div className="flex flex-row">
            <pre
              style={style}
              className="mdx-fenced-codeblock relative overflow-x-auto z-0 w-full rounded-l-2xl"
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
            <div>
              <div className="bg-[#faf8f5] h-full rounded-r-2xl w-12">
                <div className="fill-primary inline-block mt-4 ml-1">
                  <CopyButton copied={copied} onCopy={onCopy} />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </Highlight>
  );
};

export default FencedCodeBlock;
