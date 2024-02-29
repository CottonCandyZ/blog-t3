import dayjs from "dayjs";
import Link from "next/link";
import type { PostFrontmatter } from "~/components/posts";

export type PostListProps = {
  slug: string;
  abstract?: string;
  frontmatter: PostFrontmatter;
}[];

export default function PostsList({ props }: { props: PostListProps }) {
  return props.map(({ slug, abstract, frontmatter }, id) => (
    <Link
      key={id}
      href={`/posts/${slug}`}
      className="group rounded-xl hover:bg-primary-medium hover:transition-all hover:duration-700"
    >
      <div className="rounded-xl border-2 border-primary-light p-2">
        <h1 className="text-2xl font-medium text-primary group-hover:text-white group-hover:transition-all group-hover:duration-700">
          {frontmatter.title}
        </h1>
        <h2 className="line-clamp-3 font-semibold text-primary-medium group-hover:text-white group-hover:transition-all group-hover:duration-700">
          {dayjs(frontmatter.date).format("MMMM D")}
        </h2>
        <p className="line-clamp-3 text-primary-medium group-hover:text-white group-hover:transition-all group-hover:duration-700">
          {abstract}
        </p>
      </div>
    </Link>
  ));
}
