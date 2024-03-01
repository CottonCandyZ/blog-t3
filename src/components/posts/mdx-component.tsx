import React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import type { MDXContentProps } from "mdx-bundler/dist/types";
import CodeBlock from "~/components/posts/content/Codeblock";
import NextImage from "~/components/posts/content/Image";
import tagRenderer from "~/components/posts/tag-render";


export default function PostContent({ code }: { code: string }) {
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
  } as unknown as MDXContentProps["components"];
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return <Component components={components} />;
}
