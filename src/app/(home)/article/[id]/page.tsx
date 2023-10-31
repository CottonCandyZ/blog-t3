import { getPostData } from "~/lib/posts";

export default function Page({ params }: { params: { id: string } }) {
  const postData = getPostData(params.id);

  return (
    <div className="flex w-full space-x-2">
      <div className="rounded-2xl bg-white p-8 shadow-2xl xl:max-w-3xl xl:shrink-0">
        <h1 className="mb-5 text-3xl font-bold text-primary">
          {postData.title}
        </h1>
        <div className="prose prose-primary max-w-none">{postData.content}</div>
      </div>
      <div className="sticky top-3 mb-auto hidden w-full animate-show flex-col rounded-2xl bg-white p-2 shadow-2xl xl:flex">
        hello
      </div>
    </div>
  );
}
