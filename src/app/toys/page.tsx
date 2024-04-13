import ToyCard from "~/components/toys/toy-card";
import { CONFIG } from "~/config";

export const metadata = {
  title: "Toys",
};

export default function page() {
  return (
    <div className="flex max-w-6xl flex-col gap-6">
      {CONFIG.toy_cards.map((info, index) => {
        return (
          <div key={index}>
            <h2
              className="relative pl-4 text-xl font-semibold text-primary
            before:absolute before:bottom-0 before:left-0 before:top-0 before:h-full before:w-1.5 before:rounded-md
            before:bg-primary-light"
            >
              {info.title}
            </h2>
            <div className="flex-wap mt-4 flex flex-row flex-wrap gap-5">
              {info.project_list.map((project_info, index) => (
                <div key={index} className="md:w-80">
                  <ToyCard {...project_info} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
