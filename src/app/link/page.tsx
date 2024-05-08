import LinkCard from "~/components/link/link-card";
import { CONFIG } from "~/config";

export const metadata = {
  title: "Friends Link",
};

export default function page() {
  return (
    <div className="mt-4 flex flex-row flex-wrap content-start gap-5">
      {CONFIG.friend_link.map((info, index) => (
        <div key={index} className="flex-auto">
          <LinkCard {...info} />
        </div>
      ))}
    </div>
  );
}
