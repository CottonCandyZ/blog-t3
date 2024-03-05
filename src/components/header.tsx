"use client";
import Link from "next/link";
import { CottonCandy } from "~/components/icons";
import NavigationBar from "~/components/navigation-bar";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-7">
        <Link href="/" className="flex flex-row items-center gap-1">
          <span className="text-2xl font-semibold text-primary">Cotton</span>
          <CottonCandy className="h-10 w-10" />
          <span className="text-2xl font-semibold text-primary">Candy</span>
        </Link>
        <div className="hidden text-lg font-medium tracking-wider text-primary md:block">
          <NavigationBar />
        </div>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
