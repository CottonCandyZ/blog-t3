import clsx from "clsx";
import Link from "next/link";
import { ExternalLink } from "~/components/icons";

const MDXLink: React.FC<JSX.IntrinsicElements["a"]> = (props) => {
  const { className, href = "", children, ...rest } = props;
  const isPlainAnchor = typeof children === "string";
  if (href.startsWith("#")) {
    return (
      <a {...rest} className={clsx(className, rest.id && "anchor")} href={href}>
        {children}
      </a>
    );
  }
  if (!href.startsWith("http")) {
    return (
      <Link className={clsx(className, "mdx-a")} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(className, "group/a mdx-a")}
      {...rest}
    >
      {children}
      {isPlainAnchor && (
        <ExternalLink
          className="mx-0.5 inline-block
        text-primary/50 transition-colors group-hover/a:text-primary"
        />
      )}
    </a>
  );
};

export default MDXLink;
