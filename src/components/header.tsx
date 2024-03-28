"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { CottonCandy } from "~/components/icons";
import NavigationBar from "~/components/navigation-bar";
import { ThemeContext } from "~/components/theme-wrapper";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { themeNumber, setThemeNumber } = useContext(ThemeContext);
  const switchRef = useRef<HTMLDivElement>(null);
  const availableThemeNumber = [1, 2, 3, 4].filter((i) => i != themeNumber);
  const pathname = usePathname();
  const [forceList, setForceList] = useState(false);
  const useList = forceList || pathname != '/';
  useEffect(() => {
    const tog = () => {
      setToggle(false)
      if (switchRef.current!.getBoundingClientRect().top < 50) {
        setForceList(true);
      } else {
        setForceList(false)
      }
    };
    window.addEventListener("scroll", tog);
    return () => {
      window.removeEventListener("scroll", tog);
    };
  }, []);
  useEffect(() => {
    setToggle(false);
  }, [pathname])
  return (
    <header className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-7">
        <div className="flex flex-row items-center gap-1 cursor-pointer" ref={switchRef} onClick={() => {
                setToggle((toggle) => !toggle);
              }}>
          <span className="text-2xl font-semibold text-primary">Cotton</span>
          <span className="group relative flex items-center justify-center">
            <CottonCandy
              className={clsx(
                `theme-${availableThemeNumber[0]} absolute
          -z-10 h-10 w-10 transition-all duration-200`,
                {
                  "translate-y-[110%] -translate-x-[100%] md:-translate-x-8 md:-translate-y-10 md:-rotate-45":
                    toggle && !useList,
                    "translate-y-[110%] -translate-x-[100%]": toggle && useList,
                },
              )}
              onClick={() => {
                setThemeNumber(availableThemeNumber[0]!);
                localStorage.theme = availableThemeNumber[0]!
              }}
            />
            <CottonCandy
              className={clsx(
                `theme-${availableThemeNumber[1]} absolute 
          -z-10 h-10 w-10 transition-all duration-400`,
                {
                  "translate-y-[110%] md:-translate-y-12": toggle && !useList,
                  "translate-y-[110%]": toggle && useList,
                },
              )}
              onClick={() => {
                setThemeNumber(availableThemeNumber[1]!);
                localStorage.theme = availableThemeNumber[1]!
              }}
            />
            <CottonCandy
              className={clsx(
                `theme-${availableThemeNumber[2]} absolute  
          -z-10 h-10 w-10 transition-all duration-600`,
                {
                  "translate-y-[110%] translate-x-[100%] md:-translate-y-10 md:translate-x-8 md:rotate-45":
                  toggle && !useList,
                  "translate-y-[110%] translate-x-[100%]": toggle && useList,
                },
              )}
              onClick={() => {
                setThemeNumber(availableThemeNumber[2]!);
                localStorage.theme = availableThemeNumber[2]!
              }}
            />
            <CottonCandy
              className={clsx(`h-10 w-10 animate-move-show`, {
              })}
              
            />
          </span>

          <span className="text-2xl font-semibold text-primary">Candy</span>
        </div>
        <div className="hidden text-lg font-medium tracking-wider text-primary md:block">
          <NavigationBar />
        </div>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
