import React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import type { MDXContentProps } from "mdx-bundler/dist/types";
import CodeBlock from "~/components/posts/content/Codeblock";
import NextImage from "~/components/posts/content/Image";

export default function PostContent({ code }: { code: string }) {
  const components = {
    code: CodeBlock,
    image: NextImage,
  } as MDXContentProps["components"];
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return <Component components={components} />;
}
