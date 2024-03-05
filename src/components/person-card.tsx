"use client";
import Image from "next/image";
import NavigationBar from "~/components/navigation-bar";
import OuterLinks from "./outer-links";
import { CONFIG } from "~/config"

export default function InfoCard({ home }: { home: boolean }) {
  const card_info = CONFIG.card_info;
  return home ? (
    <div className="flex h-min w-min flex-col items-center gap-4 rounded-3xl bg-white px-2 py-6 text-primary-medium shadow-2xl">
      <div className="w-[21rem] text-xl font-medium">
        <NavigationBar />
      </div>
      <Image
        className="h-44 w-44 max-w-none rounded-b-full"
        src="/images/avatar.webp"
        width={250}
        height={250}
        priority={true}
        alt="Avatar of the author"
      />
      <div className="flex flex-col items-center">
        <div className="flex items-baseline space-x-2">
          <h1 className="text-2xl font-semibold">{card_info.name}</h1>
        </div>
        <h2 className="text-base font-medium">{card_info.description}</h2>
      </div>

      <OuterLinks />
    </div>
  ) : (
    <div
      className={`sm:gap-2 flex w-min items-center justify-between 
    rounded-3xl bg-white py-5 text-primary-medium 
    shadow-2xl sm:px-3`}
    >
      <div className="ml-2 flex h-16 w-16 shrink-0 justify-center marker:items-center sm:h-20 sm:w-20 sm:ml-4">
        <Image
          className="rounded-b-full"
          src="/images/avatar.webp"
          width={250}
          height={250}
          priority={true}
          alt="Avatar of the author"
        />
      </div>

      <div className="flex shrink-0 flex-col items-center gap-3">
        <div className="w-[17.7rem] text-lg font-medium sm:w-72 sm:text-xl">
          <NavigationBar />
        </div>
        <h2 className="text-base font-medium">{card_info.description}</h2>
      </div>
    </div>
  );
}
