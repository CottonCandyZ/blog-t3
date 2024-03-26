import LinkCard from "~/components/link/link-card";
import { CONFIG } from "~/config";

export default function page() {
  return (
    <div className="mt-2 flex flex-row flex-wrap content-start gap-5">
      {CONFIG.friend_link.map((info, index) => (
        <div key={index} className="grow md:max-w-sm">
          <LinkCard {...info} />
        </div>
      ))}
    </div>
  );
}
