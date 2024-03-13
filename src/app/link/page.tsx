import LinkCard from "~/components/link/link-card";
import { CONFIG } from "~/config";

export default function page() {
  return (
    <main className="mx-auto mt-2 flex min-h-[calc(-300px+100dvh)] 
    max-w-6xl flex-row flex-wrap content-start px-5 pb-20 gap-5 md:px-10">
      {CONFIG.friend_link.map((info, index) => (
        <LinkCard key={index} props={info} />
      ))}
    </main>
  );
}
