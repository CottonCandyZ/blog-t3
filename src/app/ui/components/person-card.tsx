"use client";
import Image from "next/image";
import NavigationBar from "~/app/ui/components/navigation-bar";
import OuterLinks from "./outer-links";
import { CONFIG } from "~/config/base";

export default function InfoCard({ home }: { home: boolean }) {
  const card_info = CONFIG.card_info;
  return home ? (
    <div className="flex h-min flex-col items-center gap-4 rounded-3xl bg-white px-2 py-5 text-primary shadow-2xl">
      <NavigationBar className="w-80 text-lg font-semibold" />
      <Image
        className="h-48 w-48 max-w-none rounded-b-full"
        src="/images/avatar.jpg"
        width={250}
        height={250}
        alt="Avatar of the author"
      />
      <div className="flex flex-col items-center">
        <div className="flex items-baseline space-x-2">
          <h1 className="text-2xl">{card_info.name}</h1>
          <h2 className="text-primary-light">{card_info.at}</h2>
        </div>
        <h2>{card_info.description}</h2>
      </div>

      <OuterLinks />
    </div>
  ) : (
    <div className="flex w-min items-center rounded-3xl bg-white px-2 py-3 text-primary shadow-2xl">
      <div className="ml-2 flex h-20 w-20 justify-center marker:items-center">
        <Image
          className="rounded-b-full"
          src="/images/avatar.jpg"
          width={250}
          height={250}
          alt="Avatar of the author"
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        <NavigationBar className="w-64 text-base font-semibold sm:w-72 sm:text-lg" />
        <h2>balabala</h2>
      </div>
    </div>
  );
}
