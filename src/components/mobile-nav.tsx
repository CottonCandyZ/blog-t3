"use client";
import clsx from "clsx";
import Link from "next/link";
import { CloseIcon, NavIcon } from "~/components/icons";
import { CONFIG } from "~/config";
import { useState } from "react";
import { usePathname } from "next/navigation";

const MobileNav: React.FC = () => {
  const [expend, setExpend] = useState(false);
  const pathname = usePathname();
  return (
    <div className="relative h-0 md:hidden">
      <button
        className="fixed right-8 top-4 z-20 text-primary-dark"
        onClick={() => setExpend(!expend)}
      >
        {expend ? (
          <CloseIcon className="h-9 w-9 text-primary" />
        ) : (
          <NavIcon className="h-9 w-9 text-primary-dark" />
        )}
      </button>
      <div
        className={clsx("fixed inset-0 z-10", {
          "pointer-events-none": !expend,
        })}
      >
        <button
          onClick={() => setExpend(false)}
          className={clsx(
            "absolute inset-0 z-10 backdrop-blur-2xl transition-opacity duration-500",
            {
              "opacity-1 touch-none": expend,
              "touch-auto opacity-0": !expend,
            },
          )}
        ></button>
        <nav className="absolute bottom-20 left-0 z-20 flex h-2/4 w-max flex-col justify-between text-primary-medium">
          <ul className="flex flex-col gap-5">
            {CONFIG.nav_router.map((item, index) => {
              return (
                <li
                  key={index}
                  className={clsx(
                    `-translate-x-full tracking-widest 
                  transition-transform
                duration-${(index + 4) * 100}`,
                    {
                      "translate-x-0": expend,
                      "-translate-x-full": !expend,
                    },
                  )}
                >
                  <Link
                    href={item.href}
                    className={clsx(
                      `relative ml-10 flex w-max px-3 py-2 text-4xl 
                    font-bold leading-8 drop-shadow-sm
                    before:absolute before:bottom-0 before:left-0 
                    before:right-0 before:-z-10 
                    before:rounded-xl before:bg-primary-light `,
                      {
                        "pointer-events-none text-white before:h-full before:bg-primary-medium before:shadow-sm":
                          pathname == item.href,
                      },
                    )}
                    onClick={() => setExpend(false)}
                  >
                    <item.icon className="mr-1 text-[1em]" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
