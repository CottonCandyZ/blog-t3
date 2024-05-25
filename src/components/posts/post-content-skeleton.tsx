const PostContentSkeleton: React.FC = () => {
  return (
    <div className="flex flex-row justify-center gap-10 lg:justify-normal">
      <article className="markdown-body relative w-full max-w-3xl shrink-0">
        <div className="flex max-w-sm animate-pulse flex-col gap-2">
          <div className="mb-2 h-2.5 w-48 rounded-full bg-gray-200"></div>
          <div className="h-2 max-w-[360px] rounded-full bg-gray-200"></div>
          <div className="h-2 rounded-full bg-gray-200"></div>
          <div className="h-2 max-w-[330px] rounded-full bg-gray-200"></div>
          <div className="h-2 max-w-[300px] rounded-full bg-gray-200"></div>
          <div className="h-2 max-w-[360px] rounded-full bg-gray-200"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </article>
      <aside className="sticky top-28 hidden max-h-[calc(-112px+100vh)] w-full overflow-auto p-2 lg:block lg:gap-4">
        <nav className="flex flex-col gap-2">
          <h2 className="text-2xl font-medium tracking-wider text-primary">目录</h2>
          <div className="flex max-w-sm animate-pulse flex-col gap-2">
            <div className="mb-2 h-2.5 w-28 rounded-full bg-gray-200"></div>
            <div className="h-2 max-w-[300px] rounded-full bg-gray-200"></div>
            <div className="h-2 rounded-full bg-gray-200"></div>
            <div className="h-2 max-w-[280px] rounded-full bg-gray-200"></div>
            <div className="h-2 max-w-[260px] rounded-full bg-gray-200"></div>
            <div className="h-2 max-w-[280px] rounded-full bg-gray-200"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </nav>
      </aside>
    </div>
  )
}

export default PostContentSkeleton
