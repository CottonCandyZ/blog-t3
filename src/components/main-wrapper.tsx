import type { PropsWithChildren } from "react";

const MainWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="min-h-[calc(-300px+100dvh)] mx-auto max-w-6xl md:px-10 px-5 pb-20">{children}</main>;
};

export default MainWrapper;
