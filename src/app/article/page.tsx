import Link from "next/link";
import { getSortedPostsData } from "~/lib/posts";
export const metadata = {
  title: "文章",
  description: "文章",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Page() {
  const allPostsData = getSortedPostsData();
  return (
    <div className="flex w-full max-w-4xl flex-col space-y-2 rounded-2xl bg-white p-2 shadow-2xl transition-all">
      {allPostsData.map(({ id, date, title }) => (
        <ArticleBox
          key={id}
          href={`/article/${id}`}
          title={title}
          date={date}
        />
      ))}
    </div>
  );
}

function ArticleBox({
  href,
  title,
  abstract,
  date,
}: {
  href: string;
  title: string;
  abstract?: string;
  date: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl hover:bg-primary-medium hover:transition-all hover:duration-700"
    >
      <div className="rounded-xl border-2 border-primary-light p-2">
        <h1 className="text-2xl font-medium text-primary group-hover:text-white group-hover:transition-all group-hover:duration-700">
          {title}
        </h1>
        <h2 className="line-clamp-3 text-primary-medium group-hover:text-white group-hover:transition-all group-hover:duration-700">
          {date}
        </h2>
        <p className="line-clamp-3 text-primary-medium group-hover:text-white group-hover:transition-all group-hover:duration-700">
          {abstract}
        </p>
      </div>
    </Link>
  );
}
