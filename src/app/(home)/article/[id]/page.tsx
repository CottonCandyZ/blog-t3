import { getPostData } from "~/lib/posts";

export default function Page({ params }: { params: { id: string } }) {
  const postData = getPostData(params.id);

  return (
    <div className="flex space-x-2">
      <div className="w-full rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="mb-5 text-3xl font-bold text-primary">
          {postData.title}
        </h1>
        <div className="prose prose-primary max-w-none">{postData.content}</div>
      </div>
      <div className="sticky top-3 mb-auto hidden w-full max-w-xs flex-col rounded-2xl bg-white p-2 shadow-2xl lg:flex" />
    </div>
  );
}
