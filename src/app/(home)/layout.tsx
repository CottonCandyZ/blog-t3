"use client";
import InfoCard from "../ui/components/person-card";
import { usePathname } from "next/navigation";
export default function CadNav({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  return (
    pathname == "/" ?
    <main className="flex min-h-screen justify-center items-center bg-primary-light">
      <InfoCard home={true}/>
      {children}
    </main>
    : pathname == "/article" ?
    <main className="flex min-h-screen justify-center bg-primary-light">
      <div className="flex flex-col gap-4 mt-10 w-full max-w-5xl p-3 items-center sm:items-start">
        <InfoCard home={false}/>
        {children}
      </div>
    </main> :
    <main className="flex min-h-screen justify-center bg-primary-light">
    <div className="flex flex-col gap-4 mt-10 w-full max-w-6xl p-3 items-center sm:items-start">
      <InfoCard home={false}/>
      {children}
    </div>
  </main>
  )
}