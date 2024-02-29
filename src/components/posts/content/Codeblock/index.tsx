import PreCodeBlock from "~/components/posts/content/Codeblock/pre-codeblock";

export default function CodeBlock({
  children,
  className,
}: {
  children?: string;
  className?: string;
}) {
  if (!children) return null;
  const language = className?.replace(/language-/, "");
  if (!language && !children.endsWith("\n"))
    return (
      <code className="inline-block rounded bg-zinc-400/10 px-1 text-sm font-medium text-primary-dark">
        {children}
      </code>
    );
  return <PreCodeBlock language={language!} code={children.trim()} />;
}
