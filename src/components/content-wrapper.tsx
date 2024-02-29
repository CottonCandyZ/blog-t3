"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import InfoCard from "~/components/person-card";

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const isList =
    pathName === "/posts" || pathName == "/about" || pathName == "/link";
  return (
    <div
      className={clsx(
        `mt-10 flex  w-full flex-col 
     items-center gap-4 px-2 transition-all duration-500 sm:items-start`,
        {
          [`max-w-4xl`]: isList,
          [`max-w-6xl`]: !isList,
        },
      )}
    >
      <InfoCard home={false} />
      {children}
    </div>
  );
}
