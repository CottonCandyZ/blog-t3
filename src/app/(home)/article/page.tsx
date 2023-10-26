import Link from "next/link";
import {getSortedPostsData} from '~/lib/posts';
export const metadata = {
  title: "文章",
  description: "文章",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function ArticleList() {
  const allPostsData = getSortedPostsData();
  return (
    <div className="flex flex-col space-y-2 rounded-2xl bg-white p-2 w-full shadow-2xl mr-auto">
      {
        allPostsData.map(({id, date, title}) => 
          <ArticleBox key={id} herf={`/article/${id}`} title={title} date={date}/>
        )
      }
    </div>
  );
}

function ArticleBox({
  herf,
  title,
  abstract,
  date,
}: {
  herf: string;
  title: string;
  abstract?: string;
  date: string;
}) {
  return (
    <Link
      href={herf}
      className="hover:bg-primary-medium group rounded-xl hover:transition-all hover:duration-700"
    >
      <div className="border-primary-light rounded-xl border-2 p-2">
        <h1 className="text-2xl font-medium text-primary group-hover:text-white group-hover:transition-all group-hover:duration-700">
          {title}
        </h1>
        <h2 className="text-primary-medium line-clamp-3 group-hover:text-white group-hover:transition-all group-hover:duration-700">{date}</h2>
        <p className="text-primary-medium line-clamp-3 group-hover:text-white group-hover:transition-all group-hover:duration-700">
          {abstract}
        </p>
      </div>
    </Link>
  );
}
