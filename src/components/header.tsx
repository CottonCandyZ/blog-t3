"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CottonCandy } from "~/components/icons";
import NavigationBar from "~/components/navigation-bar";
import { rgbStringToHex } from "~/lib/tools/color-convert";

const Header = () => {
  const [color, setColor] = useState(
    {} as { primary_color?: string; secondary_color?: string },
  );

  useEffect(
    () =>
      setColor({
        primary_color: rgbStringToHex(
          window
            .getComputedStyle(document.body)
            .getPropertyValue("--color-primary-light"),
        ),
        secondary_color: rgbStringToHex(
          window
            .getComputedStyle(document.body)
            .getPropertyValue("--color-primary-extralight"),
        ),
      }),
    [],
  );

  return (
    <header className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-7">
        <Link  href="/" className="flex flex-row items-center gap-1">
          <span className="text-2xl font-semibold text-primary">Cotton</span>
          <CottonCandy
            className="h-10 w-10"
            primary_color={color.primary_color}
            secondary_color={color.secondary_color}
          />
          <span className="text-2xl font-semibold text-primary">Candy</span>
        </Link>
        <div className="text-lg font-medium tracking-wider text-primary">
          <NavigationBar />
        </div>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
