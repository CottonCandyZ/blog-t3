const AboutSkeleton: React.FC = () => {
  return (
    <div className="flex max-w-sm animate-pulse flex-col gap-2">
      <div className="mb-2 h-2.5 w-48 rounded-full bg-gray-200"></div>
      <div className="h-2 max-w-[360px] rounded-full bg-gray-200"></div>
      <div className="h-2 rounded-full bg-gray-200"></div>
      <div className="h-2 max-w-[330px] rounded-full bg-gray-200"></div>
      <div className="h-2 max-w-[300px] rounded-full bg-gray-200"></div>
      <div className="h-2 max-w-[360px] rounded-full bg-gray-200"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default AboutSkeleton;
