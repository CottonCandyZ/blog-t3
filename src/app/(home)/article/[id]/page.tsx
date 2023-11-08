import { getPostData } from "~/lib/posts";

export default function Page({ params }: { params: { id: string } }) {
  const postData = getPostData(params.id);

  return (
    <div className="flex w-full items-start gap-2">
      <div className="rounded-2xl bg-white p-8 shadow-2xl xl:shrink-0 xl:basis-[48rem]">
        <h1 className="mb-5 text-3xl font-bold text-primary">
          {postData.title}
        </h1>
        <div className="prose prose-primary max-w-none">{postData.content}</div>
      </div>
      <div className="sticky top-3 hidden grow animate-show flex-col rounded-2xl bg-white p-2 shadow-2xl xl:flex">
        hello
      </div>
    </div>
  );
}