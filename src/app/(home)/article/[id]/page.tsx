import { getPostData } from "~/lib/posts";

export default function Article({ params }: { params: { id: string } }) {
  const postData = getPostData(params.id);

  return (
    <div className="flex space-x-2">
      <div className="rounded-2xl bg-white p-8 shadow-2xl w-full">
      <h1 className="text-3xl mb-5 text-primary font-blod">{postData.title}</h1>
      <div className="prose prose-primary max-w-none">
        {postData.content}
      </div>
    </div>
    <div className="lg:flex flex-col p-2 shadow-2xl bg-white rounded-2xl w-full max-w-xs hidden mb-auto sticky top-3"
    />
    </div>
  )
}