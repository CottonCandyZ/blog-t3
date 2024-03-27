"use client";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

const MainWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  return !pathname.startsWith("/posts") ? (
    <main className="mx-auto min-h-[calc(-300px+100dvh)] max-w-6xl px-5 pb-20 md:px-10">
      {children}
    </main>
  ) : (
    <>{children}</>
  );
};

export default MainWrapper;
