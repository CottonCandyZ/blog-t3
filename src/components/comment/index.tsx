import dynamic from "next/dynamic";
const User = dynamic(() => import("~/components/comment/user"), {
  loading: () => (
    <div className="h-11 w-full animate-pulse rounded-2xl bg-primary-light"></div>
  ),
});

const CommentsList = dynamic(
  () => import("~/components/comment/comments-list"),
  {
    loading: () => (
      <div className="h-11 w-full animate-pulse rounded-2xl bg-primary-light"></div>
    ),
  },
);

const Comments: React.FC<{ slug: string }> = ({ slug }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold text-primary">Comments</h2>
      <div className="mt-5">
        <User slug={slug} />
      </div>
      <div className="mt-10 flex items-center justify-center">
        <CommentsList slug={slug} />
      </div>
    </div>
  );
};

export default Comments;
