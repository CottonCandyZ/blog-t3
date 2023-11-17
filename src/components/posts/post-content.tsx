import React from "react";
import { getMDXComponent } from "mdx-bundler/client";

export default function PostContent({ code }: { code: string }) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return <Component />;
}
