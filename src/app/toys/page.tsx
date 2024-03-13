import ToyCard from "~/components/toys/toy-card";
import { CONFIG } from "~/config";

export default function page() {
  return (
    <main className="mx-auto flex min-h-[calc(-300px+100dvh)] max-w-6xl flex-col gap-2 px-5 pb-20 md:px-10">
      {CONFIG.toy_cards.map((info, index) => {
        return (
          <div key={index}>
            <h2
              className="relative text-xl font-semibold text-primary pl-4
            before:absolute before:left-0 before:bottom-0 before:top-0 before:h-full before:w-1.5 before:bg-primary-light
            before:rounded-md"
            >
              {info.title}
            </h2>
            <div className="flex-wap mt-4 flex flex-row flex-wrap gap-5 ">
              {info.project_list.map((project_info, index) => (
                <ToyCard key={index} props={project_info} />
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}
