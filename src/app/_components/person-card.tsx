import Image from "next/image";
import NavigationBar from "./navigation-bar";
import OuterLinks from "./outer-links";
import { CONFIG } from "~/config/base";

export default function InfoCard() {
  const card_info = CONFIG.card_info;
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center space-y-5 rounded-3xl bg-white px-2 py-5 text-primary">
        <NavigationBar className="w-80 text-lg" />
        <Image
          className="h-52 w-52 rounded-b-full"
          src="/images/avatar.jpg"
          width={250}
          height={250}
          alt="Avatar of the author"
        />
        <div className="flex flex-col items-center">
          <div className="flex items-baseline space-x-2">
            <h1 className="text-2xl">{card_info.name}</h1>
            <h2 className="">{card_info.at}</h2>
          </div>
          <h2>{card_info.description}</h2>
        </div>
        <OuterLinks />
      </div>
    </>
  );
}
