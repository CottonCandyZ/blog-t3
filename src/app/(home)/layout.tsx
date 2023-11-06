"use client";
import InfoCard from "../../components/person-card";
import { usePathname } from "next/navigation";
export default function CadNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname == "/" ? (
    <main className="flex min-h-screen items-center justify-center bg-primary-light">
      <InfoCard home={true} />
      {children}
    </main>
  ) : pathname == "/article" ? (
    <main className="flex min-h-screen justify-center bg-primary-light">
      <div className="mt-10 flex w-full max-w-4xl flex-col items-center gap-4 p-3 transition-all sm:items-start">
        <InfoCard home={false} />
        {children}
      </div>
    </main>
  ) : (
    <main className="flex min-h-screen justify-center bg-primary-light">
      <div className="mt-10 flex w-full max-w-6xl flex-col items-center gap-4 p-3 transition-all sm:items-start ">
        <InfoCard home={false} />
        {children}
      </div>
    </main>
  );
}
